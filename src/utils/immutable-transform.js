import immutable from 'seamless-immutable';

export default{
  in(raw){
    return immutable(raw);
  },
  out(state){
    return state.asMutable ? state.asMutable({ deep: true }) : state;
  }
};
