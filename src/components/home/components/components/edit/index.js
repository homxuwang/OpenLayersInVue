import {Select,Modify }from 'ol/interaction.js'
import {click, pointerMove, altKeyOnly} from 'ol/events/condition.js'

const editFunctions = {
  //交互选择控件
  newSelection: () => {return new Select()},
  //交互编辑控件
  newModify: (DrawVectorSource) => {
    return new Modify({
      source: DrawVectorSource
    })
  }
}


export default editFunctions