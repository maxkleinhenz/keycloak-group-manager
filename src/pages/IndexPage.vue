<template>
  <q-page class="row items-center justify-evenly">
    <q-btn
      label="Mein Profil"
      @click="
        router.push({
          name: 'profile',
        })
      "
    ></q-btn>
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
