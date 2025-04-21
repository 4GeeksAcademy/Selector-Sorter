import "bootstrap";
import "./style.css";


const drawButton = document.getElementById('drawBtn');
const sortButton = document.getElementById('sortBtn');
const original = document.getElementById('original');
const cardsAmountInput = document.getElementById('cardsAmount');
const bubbleLog = document.querySelector('.bubble-log');

let cartasGeneradas = [];

function generarCarta() {
  const palos = ["♣", "♠", "♥", "♦"];
  const numeros = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]; // del 2 al 14, donde 11–14 son J, Q, K, A

  const paloRandom = palos[Math.floor(Math.random() * palos.length)];
  const numeroRandom = numeros[Math.floor(Math.random() * numeros.length)];

  return {
    palo: paloRandom,
    numero: parseInt(numeroRandom)
  };
}

function selectionSort(arr = []) {
  const len = arr.length;
  bubbleLog.innerHTML = '';

  for (let i = 0; i < len - 1; i++) {
    let min = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j].numero < arr[min].numero) {
        min = j;
      }
    }

    if (min !== i) {
      const temp = arr[i];
      arr[i] = arr[min];
      arr[min] = temp;
    }

    const filaPaso = document.createElement('div');
    filaPaso.className = 'container d-flex flex-direction-row mb-2';

    mostrarCartas(arr, filaPaso);
    bubbleLog.appendChild(filaPaso);
  }
}

function mostrarCartas(arr, contenedor) {
  contenedor.innerHTML = '';

  arr.forEach(carta => {
    const newCard = document.createElement('div');
    newCard.className = 'generated-card';

    const paloArriba = document.createElement('div');
    paloArriba.className = 'palo-arriba';
    paloArriba.textContent = carta.palo;

    const numero = document.createElement('div');
    numero.className = 'numero';

    let valorVisible = carta.numero;
    if (carta.numero === 11) valorVisible = "J";
    else if (carta.numero === 12) valorVisible = "Q";
    else if (carta.numero === 13) valorVisible = "K";
    else if (carta.numero === 14) valorVisible = "A";

    numero.textContent = valorVisible;

    const paloAbajo = document.createElement('div');
    paloAbajo.className = 'palo-abajo';
    paloAbajo.textContent = carta.palo;

    if (carta.palo === "♥" || carta.palo === "♦") {
      paloArriba.style.color = "red";
      numero.style.color = "red";
      paloAbajo.style.color = "red";
    }

    newCard.appendChild(paloArriba);
    newCard.appendChild(numero);
    newCard.appendChild(paloAbajo);

    contenedor.appendChild(newCard);
  });
}

drawButton.addEventListener('click', () => {
  const numberOfCards = parseInt(cardsAmountInput.value, 10);

  if (isNaN(numberOfCards) || numberOfCards <= 0) {
    alert('Por favor, ingresa un número válido mayor a 0.');
    return;
  }

  if (numberOfCards > 52) {
    alert('El mazo sólo tiene 52 cartas.');
    return;
  }

  cartasGeneradas = [];

  for (let i = 0; i < numberOfCards; i++) {
    const carta = generarCarta();
    cartasGeneradas.push(carta);
  }

  mostrarCartas(cartasGeneradas, original);
  bubbleLog.innerHTML = '';
});


sortButton.addEventListener('click', () => {
  const cartasOrdenadas = [...cartasGeneradas];
  selectionSort(cartasOrdenadas);
});