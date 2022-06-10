import {Component, ChangeEvent, Ref} from 'react';

export function bind (component: Component<any, any>, prop: string) {
  return {
    value: component.state[prop],
    onChange(evt: ChangeEvent<HTMLInputElement>) {
      component.setState({[prop]: evt.target.value});
    }
  }
}