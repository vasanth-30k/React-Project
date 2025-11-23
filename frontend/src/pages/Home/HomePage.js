import React, { useEffect, useReducer, } from 'react';
import { useParams } from 'react-router-dom'; 
import { getAll, getAllTags, getAllByTag, search } from '../../Services/foodservice';
import Search from '../../Components/Search/Search';
import Thumbnails from '../../Components/Thumbnails/Thumbnails';
import Tags from '../../Components/Tags/Tags';
import NotFound from '../../Components/NotFound/NotFound';

const initialState = {foods: [], tags: []};

const reducer = (state, action) => {
    switch (action.type) {
        case'FOODS_LOADED':
        return {...state, foods: action.payload};
        case'TAGS_LOADED':
        return {...state, tags: action.payload};
        default:
            return state;
    }
}
export default function Homepage() {
const [state, dispatch] = useReducer(reducer, initialState);
const { foods, tags } = state;
const { searchTerm, tag } = useParams();

useEffect(() => {
    getAllTags().then(tags => dispatch({ type: 'TAGS_LOADED', payload: tags }));

    const loadFoods = tag ? getAllByTag(tag) : searchTerm ? search(searchTerm) : getAll();

    loadFoods.then(foods => dispatch({ type: 'FOODS_LOADED', payload: foods }));
}, [searchTerm, tag]);


  return (
    <>
        <Search margin='3rem'/>
        <Tags tags={tags}/>
        {foods.length === 0 && <NotFound/>}
        <Thumbnails foods={foods}/>
        
    </>
  );
}

