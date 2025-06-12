<script>
  import Router from "svelte-spa-router";
  import Navbar from "./lib/Navbar.svelte";
  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte";
  import Gallery from "./routes/Gallery.svelte";
  import StoryReader from "./routes/StoryReader.svelte";
  import Quiz from "./routes/Quiz.svelte";
  import Footer from "./lib/Footer.svelte";

  const routes = {
    "/": Home,
    "/about": About,
    "/gallery": Gallery,
    "/gallery/:id": StoryReader,
    "/gallery/:id/quiz": Quiz,
  };
</script>

<main class="font-inter">
  <Navbar />
  <Router {routes} />
  <Footer />
</main>
