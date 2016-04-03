import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8090);

  store.subscribe(
    () => io.emit('state', state.getStore().toJS())
  );

  io.on('connection', (socket) => {
    socket.emit('state', state.getStore().toJS())
    socket.on('action', store.dispatch.bind(store));
  });
}
