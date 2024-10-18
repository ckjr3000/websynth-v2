<template>
    <div>
      I am a channel of type: {{ type }}
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  
  export default defineComponent({
    name: 'Channel',
    props: {
      type: {
        type: String as PropType<string>, 
        required: true, 
      },
    },
  });
  </script>
  
  <style>
  </style>
  