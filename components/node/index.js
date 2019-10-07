Vue.component('node', {
  props: ['nodeData'],
  template: ` <div class="node"
                :style="nodePosition"
                draggable="true"
                @dragstart="$emit('dragNodeStart', nodeData, $event)"
                @dragend="$emit('dragNodeEnd', nodeData, $event)"
                @drag="$emit('dragNodeMove', nodeData, $event)"
                >
                <div 
                  class="circle"
                  :class="[colorClass]"
                  :style="[circleSize]"
                  @click="$emit('clickCircle', nodeData, $event)">
                </div>
                <div
                  class="rect"
                  :class="[colorClass]"
                  :style="[rectSize]"
                  @click="$emit('clickRect', nodeData, $event)">
                  <span>{{ nodeData.data.name }}</span> 
                </div>
             </div>`,
  data: function() {
    const circleR = this.nodeData.r * 0.8,
      rectHeight = circleR ,
      rectWidth = circleR * 3;
    return {
      circleSize:{
        width: circleR + 'px',
        height: circleR + 'px'
      },
      rectSize:{
        width: rectWidth + 'px',
        height: rectHeight + 'px'
      }
    }
  },
  computed: {
    nodePosition: function() {
      return {
        left: `${this.nodeData.x}px`,
        top: `${this.nodeData.y}px`,
        position: 'absolute'
      }
    },
    colorClass: function() {
      if(this.nodeData.highlight){
        return 'highlight';
      }
      if(this.nodeData.draged){
        return 'draged';
      }
      return this.nodeData.selected ? 'selected' : 'normal';
    }
  }
})