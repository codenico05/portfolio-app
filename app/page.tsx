import Navbar from './components/navbar/Navbar';
import About from './sections/about/About';
import Main from './sections/main/Main';

export default function Home() {
  return (
    <main>
      <section id="home">
        <Navbar />
        <Main />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="contact">Contact</section>
    </main>
  );
}
