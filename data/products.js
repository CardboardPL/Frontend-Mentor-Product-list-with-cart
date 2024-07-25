export let products = [];

export async function loadProducts() {
  try {
    const res = await fetch('./data/data.json');
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    products = await res.json();
  } catch (error) {
    console.error('Unexpected error. Please try again later', error);
  }
}