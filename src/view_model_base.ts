import {Application} from "./application.ts"
// import Models from "../models.ts"

export abstract class ViewModelBase {
  protected app: Application

  protected get vm() {
    return this.app.vm
  }
  // protected get m(): Models {
  // ¦ return this.app.m
  // }
  constructor(app: Application) {
    this.app = app
    this.initialize()
  }

  abstract initialize()

  getName() {
    var funcNameRegex = /function (.{1,})\(/;
    var results = (funcNameRegex).exec((<any> this).constructor.toString());
    return (results && results.length > 1) ? results[1] : "";
  }

}
