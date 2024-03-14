import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  MouseEvent,
  useLayoutEffect,
} from 'react';
import './tagcloud.css';
import { Entry, TagCloudProps, Vector2D, Vector2D2, Vector3D } from './utils';

const MATHPI180 = Math.PI / 180;

const clamp = (min: number, value: number, max: number) =>
  min > value ? min : max < value ? max : value;

const isDivVisible = (div: HTMLDivElement, margin: number = 0) => {
  const rect = div.getBoundingClientRect();
  const viewHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight
  );
  return !(rect.bottom + margin < 0 || rect.top - margin - viewHeight >= 0);
};

const useAnimationFrame = (callback: Function) => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback]
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [animate]);
};

const useMouseMove = (callback: Function) => {
  useEffect(() => {
    document.addEventListener('mousemove', (e) => callback(e));
    return () => document.removeEventListener('mousemove', (e) => callback(e));
  }, [callback]);
};

const useScrollPosition = (callback: Function) => {
  useEffect(() => {
    document.addEventListener('scroll', (e) => callback(e));
    return () => document.removeEventListener('scroll', (e) => callback(e));
  }, [callback]);
};

const TagCloud: React.FC<TagCloudProps> = ({
  children,
  speed,
  radius,
  margin = 0,
  style = {},
  opacityData = { hover: 1.0, min: 0.05, speed: 10 },
  zIndexData = { foreground: 10, background: 1 },
  maxSpeed = 1,
}: TagCloudProps) => {
  const divContainer = useRef<HTMLDivElement>(null);
  const isVisible = useRef<boolean>(true);

  const [entries, setEntries] = useState<Entry[]>([]);

  // Constant Vectors
  const center3D: Vector3D = { x: 0, y: 0, z: 0 };
  const position: Vector2D2 = { x1: 0, x2: 0, y1: 0, y2: 0 };

  // Mouse References
  const move = useRef<boolean>(true);
  const mousePos = useRef<Vector2D>({ x: 0, y: 0 });

  // Sphere References
  const internalRadius = useRef<number>(0);
  const internalDiameter = useRef<number>(0);
  const speedComponent = useRef<Vector2D>({ x: 0, y: 0 });
  const center2D = useRef<Vector2D>({ x: 0, y: 0 });

  // Other props References
  const internalSpeed = useRef<number>(0);
  const internalMaxSpeed = useRef<number>(0);
  const internalMargin = useRef<number>(0);

  useLayoutEffect(() => {
    if (divContainer.current)
      isVisible.current = isDivVisible(
        divContainer.current,
        internalMargin.current
      );
  }, []);

  useEffect(() => {
    internalSpeed.current = speed;
  }, [speed]);

  useEffect(() => {
    internalMaxSpeed.current = maxSpeed;
  }, [maxSpeed]);

  useEffect(() => {
    internalMargin.current = margin;
  }, [margin]);

  useMouseMove((event: MouseEvent) => {
    if (divContainer.current) {
      const rect = divContainer.current.getBoundingClientRect();
      mousePos.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }
  });

  useScrollPosition(() => {
    if (divContainer.current)
      isVisible.current = isDivVisible(
        divContainer.current,
        internalMargin.current
      );
  });

  const handleMouseEnter = useCallback((entry: Entry) => {
    move.current = false;
    entry.mouseOver = true;
  }, []);

  const handleMouseLeave = useCallback((entry: Entry) => {
    move.current = true;
    entry.mouseOver = false;
  }, []);

  useEffect(() => {
    const internalChildren = React.Children.toArray(children);
    center2D.current = { x: radius, y: radius };

    speedComponent.current = {
      x: speed / center2D.current.x,
      y: speed / center2D.current.y,
    };

    internalRadius.current = radius;
    internalDiameter.current = radius * 2;

    const length = internalChildren.length + 1;
    setEntries(
      internalChildren.map((child, i) => {
        const phi = Math.acos(-1 + (2 * i + 1) / length);
        const theta = Math.sqrt(length * Math.PI) * phi;

        const x = Math.cos(theta) * Math.sin(phi);
        const y = Math.sin(theta) * Math.sin(phi);
        const z = Math.cos(phi);

        const e: Entry = {
          index: i,
          children: child,
          vector2D: { x: 0, y: 0 },
          vector3D: { x, y, z },
          diff: { x: 0, y: 0 },
          opacity: 1,
          mouseOver: false,
        };

        const dx = e.vector3D.x - center3D.x;
        const dy = e.vector3D.y - center3D.y;
        const dz = e.vector3D.z - center3D.z;

        const sphereLength = Math.sqrt(dx * dx + dy * dy + dz * dz);

        e.vector3D.x /= sphereLength;
        e.vector3D.y /= sphereLength;
        e.vector3D.z /= sphereLength;

        e.vector3D.x *= radius;
        e.vector3D.y *= radius;
        e.vector3D.z *= radius;
        return e;
      })
    );
  }, [center3D.x, center3D.y, center3D.z, children, radius, speed]);

  useAnimationFrame(() => {
    if (!isVisible.current) return;

    const fx = clamp(
      -internalMaxSpeed.current,
      speedComponent.current.x * mousePos.current.x - internalSpeed.current,
      internalMaxSpeed.current
    );
    const fy = clamp(
      -internalMaxSpeed.current,
      internalSpeed.current - speedComponent.current.y * mousePos.current.y,
      internalMaxSpeed.current
    );

    const angleX = fx * MATHPI180;
    const angleY = fy * MATHPI180;

    position.x1 = Math.sin(angleX);
    position.x2 = Math.cos(angleX);
    position.y1 = Math.sin(angleY);
    position.y2 = Math.cos(angleY);

    setEntries((prevEntry) =>
      prevEntry.map((entry) => {
        if (move.current) {
          const rx = entry.vector3D.x;
          const rz =
            entry.vector3D.y * position.y1 + entry.vector3D.z * position.y2;

          entry.vector3D.x = rx * position.x2 + rz * position.x1;
          entry.vector3D.y =
            entry.vector3D.y * position.y2 + entry.vector3D.z * -position.y1;
          entry.vector3D.z = rx * -position.x1 + rz * position.x2;
        }

        entry.vector2D.x = entry.vector3D.x + center2D.current.x;
        entry.vector2D.y = entry.vector3D.y + center2D.current.y;

        if (entry.diff.x && entry.diff.y) {
          entry.vector2D.x -= entry.diff.x;
          entry.vector2D.y -= entry.diff.y;
        }

        let opacity;

        if (move.current) {
          opacity = (radius - entry.vector3D.z) / internalDiameter.current;

          if (opacity < opacityData.min) {
            opacity = opacityData.min;
          }
        } else {
          opacity = entry.opacity;
          if (entry.mouseOver) {
            opacity += (opacityData.hover - opacity) / opacityData.speed;
          } else {
            opacity += (opacityData.min - opacity) / opacityData.speed;
          }
        }
        entry.opacity = opacity;

        return entry;
      })
    );
  });

  return (
    <div
      ref={divContainer}
      className="container"
      style={{
        width: `${internalDiameter.current}px`,
        height: `${internalDiameter.current}px`,
        margin: `${margin}px`,
        ...style,
      }}
    >
      {entries.map((entry) => (
        <div
          className="entry"
          style={{
            left: `${entry.vector2D.x}px`,
            top: `${entry.vector2D.y}px`,
            opacity: entry.opacity,
            zIndex: entry.mouseOver
              ? zIndexData?.foreground
              : zIndexData?.background,
          }}
          key={entry.index}
          onMouseEnter={() => handleMouseEnter(entry)}
          onMouseLeave={() => handleMouseLeave(entry)}
        >
          {entry.children}
        </div>
      ))}
    </div>
  );
};

export default TagCloud;
