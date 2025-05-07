const express = require('express');
const router = express.Router();
const { mapIdValidator, createPlaceValidator, updateStateValidator, deletePlaceValidator } = require('../middleware/validator');

const { 
    getPlaces, 
    createPlace, 
    updateStateCode, 
    deletePlaces 
} = require('../controller/placesController');

router.route('/')
    .get(mapIdValidator, getPlaces)
    .post(createPlaceValidator, createPlace)

router.route('/:placeId')
    .put(updateStateValidator, updateStateCode)
    .delete(deletePlaceValidator, deletePlaces);

module.exports = router;
