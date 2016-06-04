/// <reference path="../src/typings/main.d.ts" />
import * as assert from 'power-assert';
import {Application} from "../src/application.ts";
import {ViewModelBase} from "../src/view_model_base.ts";

import {FuseBox,ViewModel, Property, Command} from "../src/decorator.ts"
export class TestViewModel extends ViewModelBase {
  @Property
  test_property = "test_property"
  initialize(){}

  @Command
  test_command() {
    return "test_command"
  }
}

class TestViewModels {
  @ViewModel
  public test_view_model: TestViewModel
}

@FuseBox
class TestApplication extends Application {
  public vm: TestViewModels
}

describe("Application run", function() {
  it("returns view models hash", function() {
    let app = new TestApplication({})
    let mapping = app.run()
    assert(mapping.test_view_model.test_command(), app.vm.test_view_model.test_command())
    assert(mapping.test_view_model.test_property, app.vm.test_view_model.test_property)
    assert.equal(Object.keys(mapping).length, 1)
    assert.equal(Object.keys(mapping.test_view_model).length, 2)
    // assert.deepEqual(
    // app.run(),
    // {
      // test_view_model: { 
        // test_property : app.vm.test_view_model.test_property,
        // test_command : 
      // }
    // }
  // )
  });
})

