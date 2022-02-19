<template>
  <v-chip
    small
    outlined
    :color="model.color"
    dark
    label
    @click="$emit('click', $event)"
  >
    <v-icon :color="model.color" class="pl-2" small>{{ model.icon }}</v-icon>
    <span>{{ model.text }}</span>
  </v-chip>
</template>

<script>
import Enums from "/src/plugins/enums.js";
export default {
  props: ["state"],
  computed: {
    model() {
      var member = this.getEnumMember(Enums.States, +this.state);
      return member;
    },
  },
};
</script>

<style>
</style>
