Vue.component('node-detail', {
  props: ['node'],
  template: `<div>
	              <h1>设置面板</h1>
	              <p> {{ node.data.name }}</p>
	              <template v-for="layout in layouts">
		              <input type="radio" 
		                     :id="layout.id" 
		                     :value="layout.value"
		                     v-model="node.data.layout"/>
		              <label :for="layout.id">{{ layout.name }}</label>
	              </template>
	            </div>`,
  data: function() {
    return {
      layouts: [
        { id: 0, name: '行', value: "row" },
        { id: 1, name: '列', value: "col" }
      ],
    }
  }
})