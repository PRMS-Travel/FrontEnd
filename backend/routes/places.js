const express = require('express');
const router = express.Router();

const { 
    getPlaces, 
    createPlace, 
    updateStateCode, 
    deletePlaces 
} = require('../controller/placesController');

router.route('/')
    .get(getPlaces)
    .post(createPlace)

router.route('/:placeId')
    .put(updateStateCode)
    .delete(deletePlaces);

module.exports = router;
