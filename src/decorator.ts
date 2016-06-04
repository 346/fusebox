import "reflect-metadata"
export enum ViewModelMemberType {
  Command,
  Property
}
export interface ViewModelMember {
  type: ViewModelMemberType,
  name:string
}
export var ViewModelExports = {}
export var ViewModelInstanceMap = {}

export function Command(target: any, key: string, description: PropertyDescriptor) {
  setMember(target.constructor.name, key, ViewModelMemberType.Command)
}

export function Property(target: any, key: string) {
  setMember(target.constructor.name, key, ViewModelMemberType.Property)
}

export function ViewModel(target: Object, key: string) {
  const ctor = Reflect.getMetadata("design:type", target, key)
  ViewModelInstanceMap[key] = new ctor()
}

export function FuseBox(target:any) {
  var original = target;
  function construct(constructor, args) {
    var c : any = function () {
      return constructor.apply(this, args);
    }
    c.prototype = constructor.prototype;
    return new c();
  }
  var f : any = function (...args) {
    return construct(original, args);
  }
  f.prototype = original.prototype;
  // FIXME
  f.prototype.vm = ViewModelInstanceMap
  return f;
}

function setMember(class_name, member_name, member_type) {
  
  if (!ViewModelExports[class_name]) {
    ViewModelExports[class_name] = []
  }
  const property: ViewModelMember = { type: member_type, name: member_name}
  ViewModelExports[class_name].push(property)
}


