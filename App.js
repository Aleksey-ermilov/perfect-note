import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';

import Navigation from './navigation';

import { ContextWrapper } from './context/ContextWrapper';

export default function App() {
  return (
    <ContextWrapper>
      <PaperProvider>
        <MenuProvider>
          <Navigation/>
        </MenuProvider>
      </PaperProvider>
    </ContextWrapper>
  );
}



// import React from 'react';
// import { View, Text } from 'react-native'
//
// export default function App() {
//   const str = `ttttttttttttttttttttttttt uuuu
//   rrrrrrrrrrrrrrrrrrrrrrrrrrrrr
//   eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
//   wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
//   qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq`
//
//   let q = str.split('\n').slice(0,3).map(item => item.trim())
//
//   console.log('q',q);
//   return(
//     <View>
//       <Text>{str}</Text>
//     </View>
//   )
// }