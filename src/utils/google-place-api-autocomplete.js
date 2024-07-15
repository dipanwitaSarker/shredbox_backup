import PropTypes from 'prop-types';
import React from 'react';
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import parse from 'autosuggest-highlight/parse';
// import { debounce } from '@mui/material/utils';
import { usePlacesWidget } from 'react-google-autocomplete';

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.

// function loadScript(src, position, id) {
//   if (!position) {
//     return;
//   }

//   const script = document.createElement('script');
//   script.setAttribute('async', '');
//   script.setAttribute('id', id);
//   script.src = src;
//   position.appendChild(script);
// }

// const autocompleteService = { current: null };

// export default function GoogleMaps({
//   name,
//   location,
//   // setValues
//   // onChange,
//   // onBlur,
//   setFieldValue,
//   values
// }) {
//   const [inputValue, setInputValue] = useState('');
//   const [options, setOptions] = useState([]);
//   const loaded = useRef(false);

//   if (typeof window !== 'undefined' && !loaded.current) {
//     if (!document.querySelector('#google-maps')) {
//       loadScript(
//         `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`,
//         document.querySelector('head'),
//         'google-maps'
//       );
//     }

//     loaded.current = true;
//   }

//   const fetch = useMemo(
//     () =>
//       debounce((request, callback) => {
//         autocompleteService.current.getPlacePredictions(request, callback);
//       }, 400),
//     []
//   );

//   useEffect(() => {
//     let active = true;

//     if (!autocompleteService.current && window.google) {
//       autocompleteService.current = new window.google.maps.places.AutocompleteService();
//     }
//     if (!autocompleteService.current) {
//       return undefined;
//     }

//     // if (inputValue === '') {
//     //   console.log(location);
//     //   setOptions([]);
//     //   return undefined;
//     // }

//     fetch({ input: inputValue }, (results) => {
//       if (active) {
//         // console.log(results, 'results');
//         // let newOptions = [];

//         // if (location[0]) {
//         //   newOptions = [location[0]];
//         // }

//         // if (results) {
//         //   newOptions = [...newOptions, ...results];
//         // }

//         setOptions(results);
//       }
//     });

//     return () => {
//       active = false;
//     };
//   }, [location, inputValue, fetch]);

//   return (
//     <Autocomplete
//       name={name}
//       id="google-map-demo"
//       sx={{ width: '100%' }}
//       getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
//       filterOptions={(x) => x}
//       options={options}
//       autoComplete
//       includeInputInList
//       disabled={values?.organization !== '' ? true : false}
//       filterSelectedOptions
//       value={location?.description}
//       noOptionsText="No locations"
//       onChange={(event, newValue) => {
//         // setOptions(newValue ? [newValue, ...options] : options);
//         // setValues((prev) => ({ ...prev, location: newValue.description }));
//         if (newValue) {
//           setFieldValue('location', newValue.description);
//         } else {
//           setFieldValue('location', '');
//         }
//       }}
//       onInputChange={(event, newInputValue) => {
//         setInputValue(newInputValue);
//       }}
//       renderInput={(params) => <TextField {...params} label="Machine Location" fullWidth />}
//       renderOption={(props, option) => {
//         const matches = option.structured_formatting.main_text_matched_substrings || [];

//         const parts = parse(
//           option.structured_formatting.main_text,
//           matches.map((match) => [match.offset, match.offset + match.length])
//         );

//         return (
//           <Box {...props}>
//             <Grid container alignItems="center">
//               <Grid item sx={{ display: 'flex', width: 44 }}>
//                 <LocationOnIcon sx={{ color: 'text.secondary' }} />
//               </Grid>
//               <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
//                 {parts.map((part, index) => (
//                   <Box key={index} component="span" sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}>
//                     {part.text}
//                   </Box>
//                 ))}
//                 <Typography variant="body2" color="text.secondary">
//                   {option.structured_formatting.secondary_text}
//                 </Typography>
//               </Grid>
//             </Grid>
//           </Box>
//         );
//       }}
//     />
//   );
// }

export default function GoogleMaps({
  //   // setValues
  handleChange,
  onBlur,
  setFieldValue,
  setMachineLatLng,
  values
  // machineDetails
}) {
  // const [pickLocation, setPickLocation] = useState('');
  const { ref: materialRef } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    onPlaceSelected: (place) => {
      if (place) {
        // setFieldValue('location', newValue.description);
        setFieldValue('location', place?.name + ' ' + place?.formatted_address);
        // setPickLocation(place?.name + ' ' + place?.formatted_address);
        setFieldValue('placeId', place?.place_id);
        setFieldValue('latitude', place?.geometry?.location.lat());
        setFieldValue('longitude', place?.geometry?.location.lng());
        setMachineLatLng((prev) => {
          return {
            ...prev,
            lat: place?.geometry?.location.lat(),
            lng: place?.geometry?.location.lng(),
            label: place?.name + ' ' + place?.formatted_address
          };
        });
      } else {
        setFieldValue('location', '');
      }
    },
    // inputAutocompleteValue: 'country',
    options: {
      types: ['establishment'],
      fields: ['formatted_address', 'geometry.location', 'name', 'place_id', 'address_components']
    }
  });

  return (
    <>
      {' '}
      <TextField
        disabled={values?.organization !== '' ? true : false}
        name={'location'}
        fullWidth
        color="secondary"
        variant="outlined"
        inputRef={materialRef}
        value={values?.location}
        defaultValue={values?.location}
        label="Machine Location"
        onBlur={onBlur}
        onChange={handleChange}
      />{' '}
    </>
  );
}
GoogleMaps.propTypes = {
  name: PropTypes.string,
  location: PropTypes.any,
  setValues: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  selectedLocationValue: PropTypes.object,
  setSelectedLocationValue: PropTypes.func,
  setSelectedOrganization: PropTypes.func,
  setFieldValue: PropTypes.func,
  values: PropTypes.object
};
