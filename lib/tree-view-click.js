'use babel';

import TreeViewClickView from './tree-view-click-view';
import { CompositeDisposable } from 'atom';

export default {

  treeViewClickView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.treeViewClickView = new TreeViewClickView(state.treeViewClickViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.treeViewClickView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tree-view-click:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.treeViewClickView.destroy();
  },

  serialize() {
    return {
      treeViewClickViewState: this.treeViewClickView.serialize()
    };
  },

  toggle() {
    console.log('TreeViewClick was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
