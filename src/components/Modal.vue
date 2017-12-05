<template>
<div class="modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" @click="$emit('close')">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title">
          <slot name="title"></slot>
        </h4>
      </div>
      <div class="modal-body">
        <slot name="content"></slot>
      </div>
      <div class="modal-footer" v-if="hasFooter">
        <slot name="footer"></slot>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    hasFooter: Boolean
  },
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.modal {
  display: block;
}
</style>
