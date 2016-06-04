// import _ = require('lodash')
// import Lifecycle = require('FuseJS/Lifecycle')
// import Storage = require('FuseJS/Storage')

// import Models from "./models.ts"
// import Setting from "./setting.ts"
import {ViewModelExports, ViewModelMember, ViewModelMemberType} from "./decorator.ts"

export class Application {
  
  public setting:any

  public vm:any

  public startup:() => {}
  constructor(setting:any) {

    // this.setting = new Setting(setting)
    // console.log(JSON.stringify(this.setting))
    
  }
  run():any {
    var mapping = this.createMapping(this.vm)
    // console.log(JSON.stringify(mapping))
    console.log(mapping)

    if (this.startup) {
      this.startup()
    }
    
    return mapping
  }

  
  // 1. decorator construct viewmodel mapping.
  // example:
  // {
    // "ViewModelClassName": {
      // "property_name": "Property",
      // "command_name": "Command"
    // }
  // }

  // 2. application construct viewmodels mapping.
  // example:
  // {
    // "viemodel_name": "ViewModelClassName"
  // }

  // 3. Application conbine viewmodel mapping and viewmodels mapping.
  // example:
  // {
    // "viewmodel_name" : {
      // "property_name": "property",
      // "command_name": "command"
    // }
  // }
  protected fromPairs(pairs:any) {
    let index = -1
    let length = pairs ? pairs.length : 0
    let result = {}

    while (++index < length) {
      let pair = pairs[index]
      result[pair[0]] = pair[1]
    }
    return result
  }
  protected createMapping(vm) {
    return this.fromPairs(Object.getOwnPropertyNames(vm).map((instance_name) => {
      if (typeof vm[instance_name].getName === "undefined") {
        return 
      }
      const instance_class_name = vm[instance_name].getName()
      const members = ViewModelExports[instance_class_name]
      return [instance_name, this.fromPairs(members.map((member:ViewModelMember) => {
        var binded_member:any = null
        if (member.type == ViewModelMemberType.Command) {
          binded_member = vm[instance_name][member.name].bind(vm[instance_name])
        } else {
          binded_member = vm[instance_name][member.name]
        }
        return [member.name, binded_member]
      }))]
    }))
  }



}
