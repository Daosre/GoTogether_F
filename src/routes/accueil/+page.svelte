<script lang="ts">
	import '../../app.css';
	import Footer from "../../components/footer.svelte";
	import Logo from "../../components/logo.svelte";

</script>

<header class="flex justify-center p-4">
  <Logo/>
</header>

<main class="flex flex-col items-center mb-4">
  <section class="border rounded-[20px] bg-[#FCF8F4] w-[315px] h-[390px] flex flex-col items-center justify-center text-center">
    <article class="flex flex-col justify-center items-center m-2 gap-1 ">
      <h1 class="text-[32px] Damion">Bienvenue !</h1>
      <p class="text-[20px] Agdasima">Go Together est votre partenaire idéal pour organiser des événements inoubliables, où chaque moment est conçu pour renforcer les liens, stimuler la créativité et offrir des expériences exceptionnelles. Rejoignez-nous pour créer des événements qui rassemblent, inspirent et célèbrent l'esprit de communauté.</p>
      <p class="text-[16px] Agdasima">Des événements pourraient vous intéresser !
        <a href="/" class="text-[#4E5C08]">Voir les événements</a></p>
      <p class="text-[16px] Agdasima">Participez à des événements ! <a href="/" class="text-[#4E5C08]">Inscrivez-vous</a></p>
      <p class="text-[16px] Agdasima">Déjà membre ?  <a href="/" class="text-[#4E5C08]">Connectez vous</a></p>
    </article>
  </section>
</main>

<Footer/>