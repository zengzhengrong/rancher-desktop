<script lang="ts">
import Vue from 'vue';
import type { PropType } from 'vue';

import PreferencesBodyApplication from '@/components/Preferences/BodyApplication.vue';
import PreferencesBodyVirtualMachine from '@/components/Preferences/BodyVirtualMachine.vue';
import PreferencesBodyWsl from '@/components/Preferences/BodyWsl.vue';
import PreferencesBodyContainerRuntime from '@/components/Preferences/BodyContainerRuntime.vue';
import PreferencesBodyKubernetes from '@/components/Preferences/BodyKubernetes.vue';
import { Settings } from '@/config/settings';

export default Vue.extend({
  name:       'preferences-body',
  components: {
    PreferencesBodyApplication,
    PreferencesBodyVirtualMachine,
    PreferencesBodyWsl,
    PreferencesBodyContainerRuntime,
    PreferencesBodyKubernetes
  },
  props:      {
    currentNavItem: {
      type:     String,
      required: true
    },
    preferences: {
      type:     Object as PropType<Settings>,
      required: true
    }
  },
  computed: {
    normalizeNavItem(): string {
      return this.currentNavItem.toLowerCase().replaceAll(' ', '-');
    },
    componentFromNavItem(): string {
      return `preferences-body-${ this.normalizeNavItem }`;
    }
  }
});
</script>

<template>
  <div>
    <slot>
      <component
        :is="componentFromNavItem"
        :preferences="preferences"
        v-on="$listeners"
      />
    </slot>
  </div>
</template>
