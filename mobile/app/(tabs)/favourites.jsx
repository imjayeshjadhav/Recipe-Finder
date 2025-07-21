import { View, Text, Alert, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useClerk, useUser } from '@clerk/clerk-expo'
import { API_URL } from '../../constants/api'
import LoadingSpinner from '../../components/LoadingSpinner'
import  { favoritesStyles} from  "../../assets/styles/favorites.styles"
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import RecipeCard from "../../components/RecipeCard";
import NoFavouritesFound from '../../components/NoFavouritesFound'

const FavouritesScreen = () => {

  const {signOut} = useClerk()
  const { user } = useUser()

  const [favouriteRecipes, setFavouriteRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const loadFavourite = async () =>{
      try {
        const response = await fetch(`${API_URL}/favourites/${user.id}`)
        
        if (!response.ok) throw new Error("Failed to fetch favourites")
        
        const favourites = await response.json()
        const transformedFavourites = favourites.map((fav) =>({
          ...fav,
          id: fav.recipeId
        }))

        setFavouriteRecipes(transformedFavourites)
      } catch (error) {
        Alert.alert("Error", "Failed to load favourites")
      } finally {
        setLoading(false)
      }
    }

    loadFavourite()

  },[])

  const handleSignOut = async () =>{
    Alert.alert("Logout", "Are you sure want to log out" ,
      [
        {
          "text":"Cancel", style:"cancel",
        },
        {
          "text":"Logout", style:"destructive", onPress: signOut
        }
      ]
    )
  }

  if (loading) return <LoadingSpinner message='Loading your favourites...'/>

  return (
    <View style={favoritesStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={favoritesStyles.header}>
          <Text style={favoritesStyles.title}>Favourites</Text>
          <TouchableOpacity style={favoritesStyles.logoutButton} onPress={handleSignOut}>
            <Ionicons name='log-out-outline' size={22} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <View style={favoritesStyles.recipesSection}>
          <FlatList
            data={favouriteRecipes}
            renderItem={(item)=> <RecipeCard recipe={item} /> }
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={favoritesStyles.row}
            contentContainerStyle={favoritesStyles.recipesGrid}
            scrollEnabled={false}
            ListEmptyComponent={<NoFavouritesFound />}
          />
        </View>
      </ScrollView>
      
    </View>
  )
}

export default FavouritesScreen