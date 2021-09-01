<template>
  <v-app>
    <v-main>
      <Verify/>
    </v-main>
  </v-app>
</template>

<script>
import Verify from './components/Verify';

export default {
  name: 'App',

  components: {
    Verify,
  },

  data: () => ({
    //
  }),
};
</script>
