<template>
  <div v-if="!props.groups?.length ?? 0">no groups</div>
  <q-list v-if="props.groups">
    <q-item
      v-for="group in groups"
      :key="group.id"
      :to="{
        name: 'groups',
        params: { groupId: group.id },
      }"
      clickable
      v-ripple
      :title="group.name + ' anzeigen'"
    >
      <q-item-section>{{ group.name }}</q-item-section>
      <q-item-section side>
        <q-btn size="12px" flat dense round icon="chevron_right" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { KeycloakGroup } from 'src/models/KeycloakGroup';
import { PropType } from 'vue';

const props = defineProps({
  groups: {
    type: Object as PropType<KeycloakGroup[] | undefined>,
  },
});
</script>

<style scoped></style>
