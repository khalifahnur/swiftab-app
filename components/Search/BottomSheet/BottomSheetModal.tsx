import { StyleSheet, Text} from 'react-native'
import React from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'

export default function BottomSheetModal() {
  return (
    <BottomSheet snapPoints={[200]}>
      <BottomSheetView>
        <Text>Awesome 🎉</Text>
      </BottomSheetView>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({})