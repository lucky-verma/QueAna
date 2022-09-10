/**
 * expects the address components from the result of the google maps api
 * pass in the type for which you want the address from
 * e.g.
 * 
  'address_components': [
    {
      'long_name': 'Kandivali East',
      'short_name': 'Kandivali East',
      'types': [
        'political',
        'sublocality',
        'sublocality_level_1'
      ]
    },
    {
      'long_name': 'Mumbai',
      'short_name': 'Mumbai',
      'types': [
        'locality',
        'political'
      ]
    },
    {
      'long_name': 'Mumbai Suburban',
      'short_name': 'Mumbai Suburban',
      'types': [
        'administrative_area_level_2',
        'political'
      ]
    },
    {
      'long_name': 'Maharashtra',
      'short_name': 'MH',
      'types': [
        'administrative_area_level_1',
        'political'
      ]
    },
    {
      'long_name': 'India',
      'short_name': 'IN',
      'types': [
        'country',
        'political'
      ]
    },
    {
      'long_name': '400101',
      'short_name': '400101',
      'types': ['postal_code']
    }
  ],
 * @param {*} address_components 
 */

export function getLongNameFromType (address_components, typeFilter) {

  for (const component of address_components) {
    if (component.types.includes(typeFilter)) {
      return component.long_name
    }
  }
  return ''
}