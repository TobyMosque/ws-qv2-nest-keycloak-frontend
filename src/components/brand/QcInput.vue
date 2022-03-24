<template>
  <q-input v-bind="$props" :filled="cFilled" :outlined="cOutlined">
    <template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { QInput } from 'quasar';
import useAppStore from 'src/stores/app';

const BooleanUndefined = {
  type: Boolean,
  default() {
    return undefined;
  },
};

export default defineComponent({
  name: 'QcInput',
  emits: [QInput.emits],
  props: {
    standard: BooleanUndefined,
    filled: BooleanUndefined,
    outlined: BooleanUndefined,
  },
  setup(props) {
    const appStore = useAppStore();

    const hasProps = computed(
      () =>
        props.standard !== undefined ||
        props.filled !== undefined ||
        props.outlined !== undefined
    );
    const cFilled = computed(() =>
      hasProps.value ? props.filled ?? false : appStore.dark
    );
    const cOutlined = computed(() =>
      hasProps.value ? props.outlined ?? false : !appStore.dark
    );

    return { cFilled, cOutlined };
  },
});
</script>
