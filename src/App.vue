<template>
  <div id="app">
    <h1>Doctores</h1>
    <ul>
      <li v-for="doctor in doctores" :key="doctor._id">{{ doctor.nombre }}</li>
    </ul>
  </div>
</template>

<script>
import { obtenerDoctores } from './controller/Doctor_controller';

export default {
  name: 'App',
  data() {
    return {
      doctores: []
    };
  },
  async created() {
    try {
      const { data, error } = await obtenerDoctores();
      if (error) {
        console.error('Error al obtener los doctores:', error);
      } else if (data) {
        this.doctores = data;
      }
    } catch (error) {
      console.error('Error en la llamada a obtenerDoctores:', error);
    }
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
