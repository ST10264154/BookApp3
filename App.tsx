import { useState, useEffect, } from 'react';
import { View, Text, Button, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TextInput, FlatList, TouchableOpacity, ImageBackground, StyleSheet, Alert,  SafeAreaView,
  ScrollView, } from 'react-native';
import React from 'react';

const backgroundImage = require('./gallery/book.png');

const handleAddBook = (name, author, genre, pages, itemId, setBookList) => {
  if (name && genre && author && pages) {
    setBookList((prevList) => [
      {
        id: itemId,
        name,
        author,
        genre,
        pages,
      },
      ...prevList,
    ]);
  }
};

const HomeScreen = ({ navigation, route }) => {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    if (route.params?.book) {
      const { name, author, genre, pages, itemId } = route.params.book;

      if (!bookList.some((item) => item.id === itemId)) {
        handleAddBook(name, author, genre, pages, itemId, setBookList);
      }
    }
  }, [route.params?.book, bookList]);

  const handleDeleteBook = (id) => {
    setBookList((prevList) => prevList.filter((item) => item.id !== id));
  };

  // Function to calculate the average number of books read
  const calculateAverageBooksRead = () => {
    return bookList.length;
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', color: "#841584" }}>
        <Text style={{ color: 'white', fontSize: 42, lineHeight: 56, fontWeight: 'bold', textAlign: 'center' }}>Library</Text>

        <Button
          title="Go to Title"
          onPress={() => {
            const itemId = Math.random().toString();
            navigation.navigate('Title', {
              itemId,
              anotherParam: 'type anything here to send across to the details',
              setBookList,
            });
          }}
          color="#841584"
        />

        <Button
          title="Go to Author"
          onPress={() => {
            navigation.navigate('Author', {
              itemId: Math.random().toString(),
              anotherParam: 'type anything here to send across to the details',
              setBookList,
            });
          }}
          color="#FF3390"
        />

        <Button
          title="Go to Genre"
          onPress={() => {
            navigation.navigate('Genre', {
              itemId: Math.random().toString(),
              anotherParam: 'type anything here to send across to the details',
              setBookList,
            });
          }}
          color="#9933FF"
        />

        <Button
          title="Go to Number of pages"
          onPress={() => {
            navigation.navigate('Number of pages', {
              itemId: Math.random().toString(),
              anotherParam: 'type anything here to send across to the details',
              setBookList,
            });
          }}
          color="#A530B1"
        />


        
        <FlatList
        
          data={bookList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.author}</Text>
              <Text>{item.genre}</Text>
              <Text>{item.pages}</Text>
              <TouchableOpacity onPress={() => handleDeleteBook(item.id)}>
                <Text>Delete</Text>
              </TouchableOpacity>
             
            </View>
          )}
        />

        {/* Display the average number of books read */}
        <Text>Average Books Read: {calculateAverageBooksRead()}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

function TitleScreen({ route, navigation }) {
  const { itemId, anotherParam, setBookList } = route.params;
  const [name, setName] = useState('');

  const handleAddBookWithTitle = () => {
    handleAddBook(name, '', '', '', itemId, setBookList);
    navigation.navigate('Home', {
      book: {
        name,
        author: '',
        genre: '',
        pages: '',
      },
    });
  };

  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', fontSize: 27, }}>
      <Text style = {{ fontSize: 23,}}>Enter the title of the book</Text>
      <TextInput
        placeholder="Title"
        value={name}
        onChangeText={(text) => setName(text)}
        style={{ marginBottom: 10, fontSize: 27 }}
      />
     
      <Button title="Add Book" onPress={handleAddBookWithTitle} onPress={() => Alert.alert('Title page was added')}/> 

      <Button title="Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go Back" onPress={() => navigation.goBack()}/>
      <Button title="Author Screen" onPress={() => {navigation.navigate('Author', {itemId: 101, anotherParam: 'type anything here to send across to the details',}); }}color="#FF3390"/>
      
    </View>
  );
}

function AuthorScreen({route,navigation}){
  const { itemId, anotherParam, setBookList } = route.params;
  const [author, setAuthor] = useState('');

  const handleAddBookWithAuthor = () => {
    handleAddBook('', author, '', '', setBookList);
    navigation.navigate('Home', {
      book: {
        name: '',
        author,
        genre: '',
        pages: '',
      },
    });
  };
  

  return(
<View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
<Text style = {{ fontSize: 23,}}>Enter the author of the book</Text>
<TextInput
          placeholder="Author"
          value={author}
          onChangeText={(text) => setAuthor(text)}
          style={{ marginBottom: 10, fontSize: 27 }}
        />

<Button title="Add Book" onPress={handleAddBookWithAuthor} onPress={() => Alert.alert('Author page was added')}/> 

<Button title="Home" onPress={() => navigation.navigate('Home')}/>
<Button title="Go Back" onPress={() => navigation.goBack()}/>
<Button title="Genre Screen" onPress={() => {
  navigation.navigate('Genre', {
itemId: 101,
anotherParam: 'type anything here to send across to the details',
}); }}
color="#9933FF"/>
</View>
  );
}

function GenreScreen({route,navigation}){
  const {itemId, anotherParam, setBookList } = route.params;
  const [genre, setGenre] = useState('');

  const handleAddBookWithGenre = () => {
    handleAddBook('', '', genre, '', setBookList);
    navigation.navigate('Home', {
      book: {
        name: '',
        author: '',
        genre,
        pages: '',
      },
    });
  };
  

  return(
<View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
<Text style = {{ fontSize: 23,}}>Enter the genre of the book</Text>
 <TextInput
          placeholder="Genre"
          value={genre}
          onChangeText={(text) => setGenre(text)}
          style={{ marginBottom: 10, fontSize: 27 }}
        />

<Button title="Add Book" onPress={handleAddBookWithGenre} onPress={() => Alert.alert('Genre page was added')}/> 

<Button title="Home" onPress={() => navigation.navigate('Home')}/>
<Button title="Go Back" onPress={() => navigation.goBack()}/>
<Button title="Number of pages"
onPress={() => {
  navigation.navigate('Number of pages', {
itemId: 101,
anotherParam: 'type anything here to send across to the details',
}); }}
color="#A530B1"/>
</View>
  );
}

function NumberScreen({route,navigation}){
  const {itemId, anotherParam, setBookList } = route.params;
  const [pages, setPages] = useState('');

  const handleAddBookWithPages = () => {
    handleAddBook('', '', '', pages, setBookList);
    navigation.navigate('Home', {
      book: {
        name: '',
        author: '',
        genre: '',
        pages,
      },
    });
  };
  

  return(
<View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
<Text style = {{ fontSize: 23,}}>Enter the number of pages of the book</Text>
 <TextInput
          placeholder="Number of Pages"
          value={pages}
          onChangeText={(text) => setPages(text)}
          keyboardType="numeric"
          style={{ marginBottom: 20, fontSize: 27 }}
        />

<Button title="Add Book" onPress={handleAddBookWithPages} onPress={() => Alert.alert('Number of pages was added')}/> 

<Button title="Home" onPress={() => navigation.navigate('Home')}/>
<Button title="Go Back" onPress={() => navigation.goBack()}/>
<Button title="Back to Title Screen" onPress={() => {
  navigation.navigate('Title', {
itemId: 101,
anotherParam: 'type anything here to send across to the details',
})
; }}
color="#841584"/>
</View>
  );
}

const Stack = createNativeStackNavigator();

function App(){
  return(
   
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name = 'Home' component={HomeScreen}/>
      <Stack.Screen name = 'Title' component={TitleScreen}/>
      <Stack.Screen name = 'Author' component={AuthorScreen}/>
      <Stack.Screen name = 'Genre' component={GenreScreen}/>
      <Stack.Screen name = 'Number of pages' component={NumberScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

export default App;