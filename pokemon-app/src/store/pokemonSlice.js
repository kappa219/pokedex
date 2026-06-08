import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async Thunk per recuperare i Pokemon dall'API
export const fetchPokemon = createAsyncThunk(
  'pokemon/fetchPokemon',
  async (pokemonName) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    if (!response.ok) {
      throw new Error('Failed to fetch Pokemon')
    }
    const data = await response.json()
    return {
      name: data.name,
      image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
      types: data.types.map((t) => t.type.name),
      height: `${data.height / 10}m`,
      weight: `${data.weight / 10}kg`,
      order: data.order,
      grido: data.forms?.[0]?.name || '',
      id: data.id,
    }
  }
)

// Async Thunk per recuperare la lista di Pokemon
export const fetchPokemonList = createAsyncThunk(
  'pokemon/fetchPokemonList',
  async (_, { rejectWithValue }) => {
    try {
      // Recupera i primi 100 Pokemon
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=400&offset=0')
      if (!response.ok) {
        throw new Error('Failed to fetch Pokemon list')
      }
      const data = await response.json()

      // Recupera i dettagli di ogni Pokemon
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const detailResponse = await fetch(pokemon.url)
          const detailData = await detailResponse.json()
          return {
            name: detailData.name,
            image:
              detailData.sprites.other['official-artwork'].front_default ||
              detailData.sprites.front_default,
            types: detailData.types.map((t) => t.type.name),
            height: `${detailData.height / 10}m`,
            weight: `${detailData.weight / 10}kg`,
            order: detailData.order,
            grido: detailData.forms?.[0]?.name || '',
            latest:detailData.cries ? `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${detailData.id}.ogg` : null,
            legacy:detailData.cries ? `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/${detailData.id}.ogg` : null,
            id: detailData.id,
          }
        })
      )

      return pokemonDetails
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  list: [],
  single: null,
  loading: false,
  error: null,
  searchTerm: '',
}

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setSearchTerm: (state, action) => {
      const v = action.payload ?? ''
      state.searchTerm = v.toString().toLowerCase().trim()
    },
    clearSearch: (state) => {
      state.searchTerm = ''
    },
  },
  extraReducers: (builder) => {
    // Fetch Pokemon List
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'An error occurred'
      })

    // Fetch Single Pokemon
    builder
      .addCase(fetchPokemon.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.loading = false
        state.single = action.payload
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { clearError, setSearchTerm, clearSearch } = pokemonSlice.actions
export default pokemonSlice.reducer
