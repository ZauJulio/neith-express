import { BaseService } from '@core';

export class HelloService extends BaseService {
  public message(props: { name: string }) {
    this.log("Sending 'Hello World' message to", props.name);

    return 'Hello World, ' + props.name;
  }
}

export default HelloService;
