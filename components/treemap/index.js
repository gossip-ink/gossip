Vue.component('treemap', {
  props: ['root', 'width', 'height'],
  template: `<div :style="[sizeStyle, borderStyle]" 
                  :id="root.data.name"
                  :class="[layout]">
	              <treemap
	                v-for="child in root.children"
	                :root="child"
					        :width="computeWidth"
					        :height="computeHeight"
                  @emitSelect="emitSelect"
	              ></treemap>
	           </div>`,
  methods:{
    highlight: function(){
      this.root.selected = true;
      this.$emit('emitSelect', this.root.id);
    },
    emitSelect: function(id){
      console.log(id);
      this.$emit('emitSelect', id);
    }
  },
  computed: {
    computeWidth: function() {
      if (this.root.data.layout === 'row') {
        const width = this.width / this.root.children.length | 0;
        return width * 0.9;
      }
      if (this.root.data.layout === 'col') {
        return this.width * 0.9;
      }
    },
    computeHeight: function() {
      if (this.root.data.layout === 'row') {
        return this.height * 0.9;
      }
      if (this.root.data.layout === 'col') {
        const height = this.height / this.root.children.length | 0;
        return height * 0.9;
      }
    },
    sizeStyle: function() {
      const color = `rgb(${this.root.depth * 50},${ this.root.depth * 50},${ this.root.depth * 50})`;
      return {
        width: this.width + 'px',
        height: this.height + 'px',
        background: color
      }
    },
    layout: function() {
      return this.root.data.layout === 'row' ? 'box-row' : 'box-col';
    },
    borderStyle: function(){
      const color = `rgb(${this.root.depth * 50},${ this.root.depth * 50},${ this.root.depth * 50})`;
      const boderColor = this.root.selected ? 'red' : color;
      return {
        border: '5px solid ' + boderColor
      }
    }
  }
})