<script lang="ts">
	import { onMount } from 'svelte';
	import rawWords from './words.json';

	let words = rawWords as string[];
	console.log(`Loaded ${words.length} words`);
	let currentWord: string = '';
	let gameMode: string = '';
	let scores = [0, 0];
	let maxTime = 30;
	let timeRemaining = maxTime;
	let currentGameState: gameState = 'paused';
	const timer = setInterval(() => {
		if (currentGameState == 'playing' && timeRemaining > 0) {
			timeRemaining--;
		}
	}, 1000);

	function nextWord() {
		let options = words.filter((w) => w != currentWord);
		let word = options[Math.floor(Math.random() * options.length)];
		currentWord = word;

		let mode = getGameMode();
		gameMode = mode;
	}

	type gameMode = 'player versus team' | 'player versus player' | 'normal';
	type gameModeProbability = { mode: gameMode; odds: number };
	const gameModeOdds: gameModeProbability[] = [
		{ mode: 'player versus team', odds: 0.15 },
		{ mode: 'player versus player', odds: 0.25 },
		{ mode: 'normal', odds: 1 }
	];

	type gameState = 'playing' | 'paused';

	function getGameMode() {
		let r = Math.random();
		let mode = gameModeOdds.find((m) => r < m.odds);
		return mode?.mode || 'normal';
	}

	function showRoundTypeAlert() {
		alert(
			`there are ${gameModeOdds.length} round types:` +
				gameModeOdds.map((m) => `\n${m.mode}`).join('') +
				`\n\nround type is randomly selected at the start of each round`
		);
	}

	function showHelp() {
		alert(
			`teams take turns singing 4 bars of a song that include the word shown\n` +
				`the team that can't think of a song loses the round\n` +
				`the team that wins the round gets a point`
		);
	}

	onMount(() => {
		nextWord();
	});
</script>

<head>
	<title>Encore MVP</title>
</head>

<body>
	<div>
		<div
			style="
			border-color:forestgreen;
			border-style: solid;
			border-width: 0 0 0.5rem 0;
		 	padding: 1rem
		 "
		>
			<h1>Encore MVP</h1>
		</div>
		<div
			style="
			border-color:forestgreen;
			border-style: solid;
			border-width: 0 0 0.5rem 0;
		 	padding: 1rem
		 "
		>
			<p style="margin:0">
				round type <a href="#" on:click={showRoundTypeAlert}>(?)</a> :
				<b>{gameMode}</b>
			</p>
			<p>think of songs including</p>
			<h2 style="text-style:bold">{currentWord}</h2>
			<button on:click={nextWord}>next word</button>
		</div>
		<div
			style="
			border-color:forestgreen;
			border-style: solid;
			border-width: 0 0 0.5rem 0;
		 	padding: 1rem
		 "
		>
			<p style="margin: 0">timer</p>
			<div class="scoreRow">
				<button
					on:click={() => {
						currentGameState = currentGameState == 'playing' ? 'paused' : 'playing';
					}}>{currentGameState != 'playing' ? 'start' : 'pause'}</button
				>
				<h2>{timeRemaining}</h2>
				<button
					on:click={() => {
						timeRemaining = maxTime;
					}}>reset</button
				>
			</div>
		</div>
		<div
			style="
			border-color:forestgreen;
			border-style: solid;
			border-width: 0 0 0.5rem 0;
		 	padding: 1rem
		 "
		>
			<p style="margin: 0">scores</p>
			<div class="scoreRow">
				<div style="display:flex flex-direction:column">
					<p>team 1</p>
					<div class="scoreRow">
						<button
							disabled={scores[0] == 0}
							class="scoreButton"
							on:click={() => {
								scores[0]--;
							}}>-</button
						>
						<p class="scoreValue">{scores[0]}</p>
						<button
							class="scoreButton"
							on:click={() => {
								scores[0]++;
							}}>+</button
						>
					</div>
				</div>
				<div style="display:flex flex-direction:column">
					<p>team 2</p>
					<div class="scoreRow">
						<button
							class="scoreButton"
							disabled={scores[1] == 0}
							on:click={() => {
								scores[1]--;
							}}>-</button
						>
						<p class="scoreValue">{scores[1]}</p>
						<button
							class="scoreButton"
							on:click={() => {
								scores[1]++;
							}}>+</button
						>
					</div>
				</div>
			</div>
			<a href="#" on:click={showHelp}>how to play</a>
		</div>
	</div></body
>

<style>
	button {
		font-size: larger;
		padding: 1rem;
		margin: 0.5rem;
	}
	div {
		font-family: sans-serif;
		font-size: large;
		text-align: center;
	}
	.scoreRow {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.scoreRow button {
		padding: 1rem;
		margin: 0.5rem 1rem;
	}
	.scoreRow p {
		margin: 0.5rem 0;
	}
</style>
