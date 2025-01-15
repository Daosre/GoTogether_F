<script lang="ts">
	import Typewriter from 'svelte-typewriter';
	import '../app.css';
	import Footer from '../components/footer.svelte';
	import Logo from '../components/logo.svelte';
</script>

<div class="fond flex flex-col bg-cover bg-center">
	<header class="flex justify-center p-4">
		<Logo />
	</header>

	<main class="mb-6 flex grow flex-col items-center">
		<section
			class="flex h-[390px] w-[315px] flex-col items-center justify-center rounded-[20px] text-center shadow md:h-[470px] md:w-[450px] lg:w-[660px] lg:w-[804px]"
		>
			<article class="m-2 flex flex-col items-center justify-center gap-1 lg:gap-4">
				<h1 class="Damion text-[32px] md:mb-4 lg:hidden">Bienvenue !</h1>
				<div class="Damion hidden text-[40px] lg:block">
					<Typewriter mode="loopRandom">
						<h1>Bienvenue !</h1>
						<h1>Welcome !</h1>
					</Typewriter>
				</div>
				<p class="Agdasima text-[20px] md:text-[24px] lg:text-[26px]">
					Go Together est votre partenaire idéal pour organiser des événements inoubliables, où
					chaque moment est conçu pour renforcer les liens, stimuler la créativité et offrir des
					expériences exceptionnelles. Rejoignez-nous pour créer des événements qui rassemblent,
					inspirent et célèbrent l'esprit de communauté.
				</p>
				<p class="Agdasima text-[16px] md:text-[20px] lg:text-[24px]">
					Des événements pourraient vous intéresser ! <br class="md:hidden" />
					<a href="/accueil" class="text-[#4E5C08]">Voir les événements</a>
				</p>
				<p class="Agdasima text-[16px] md:text-[20px] lg:text-[24px]">
					Participez à des événements ! <a href="/signup" class="text-[#4E5C08]">Inscrivez-vous</a>
				</p>
				<p class="Agdasima text-[16px] md:text-[20px] lg:text-[24px]">
					Déjà membre ? <a href="/signin" class="text-[#4E5C08]">Connectez vous</a>
				</p>
			</article>
		</section>
	</main>
	<Footer />
</div>
