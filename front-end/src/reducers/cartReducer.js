export default function(state = {total: 0, items: 0}, action){
	switch(action.type){
		case 'UPDATE_CART':
		case 'GET_CART':
			return action.payload.data;
		default:
			return state;
	}
}