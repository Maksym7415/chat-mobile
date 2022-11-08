/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, Text, Alert} from 'react-native';
import {useTheme, Icon} from 'react-native-paper';
import {
  launchImageLibrary,
  launchCamera,
  launchImageLibraryAsync,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import {Keyboard} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const imagePickerOptions = {
  noData: true,
};

const Gallery = ({closeTranslateYBottomSheet}) => {
  const actionSheetRef = React.useRef();
  const onSelectAttachment = () => {};

  console.log(launchCamera, 'launchImageLibrary');

  const pickImage = async () => {
    let result = await launchImageLibrary({
      mediaTypes: () => ['png'],
      aspect: [4, 3],
      quality: 1,
      base64: false,
    });
    // look at the keys, assets should be one
    console.log(result, 'result');
    if (!result.cancelled) {
      // It appears that assets is an array?
      // setImage(result.assets[0].uri);
    }
  };

  const handleChoosePhoto = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      actionSheetRef.current?.setModalVisible();
    }, 10);
  };
  const openCamera = () => {
    const options = {
      title: 'Load Photo',
      customButtons: [
        {name: 'button_id_1', title: 'CustomButton 1'},
        {name: 'button_id_2', title: 'CustomButton 2'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
      console.log(response, 'ccccresponse');
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        Alert.alert(response.customButton);
      } else {
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // setImageSource(response.uri);
      }
    });
  };
  const openGallery = () => {
    // pickImage();
    launchImageLibrary(
      imagePickerOptions,
      response => {
        console.log(response, 'response');
        if (response.uri) {
          // onSelectAttachment({attachment: response});
        }
      },
      // });
      // launchImageLibrary(
      //   {
      //     storageOptions: {
      //       skipBackup: true,
      //       path: 'images',
      //     },
      //   },
      //   response => {
      //     console.log(response, 'response');
      //     if (response.error) {
      //       console.log('LaunchImageLibrary Error: ', response.error);
      //     } else {
      //       // setImageSource(response.uri);
      //     }
      //   },
    );
  };
  const openDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.allFiles,
          DocumentPicker.types.images,
          DocumentPicker.types.plainText,
          DocumentPicker.types.audio,
          DocumentPicker.types.pdf,
          DocumentPicker.types.zip,
          DocumentPicker.types.csv,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.ppt,
          DocumentPicker.types.pptx,
          DocumentPicker.types.xls,
          DocumentPicker.types.xlsx,
        ],
      });
      const attachment = {
        uri: res.uri,
        type: res.type,
        fileSize: res.size,
        fileName: res.name,
      };
      onSelectAttachment({attachment});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };
  const onPressItem = itemType => {
    // actionSheetRef.current?.hide();
    console.log(itemType, 'itemType');
    setTimeout(() => {
      if (itemType === 'upload_camera') {
        openCamera();
      }
      if (itemType === 'upload_gallery') {
        openGallery();
      }
      if (itemType === 'upload_file') {
        openDocument();
      }
    }, 500);
  };

  return (
    <React.Fragment>
      <Pressable onPress={() => onPressItem('upload_camera')}>
        <Text>Camera</Text>
      </Pressable>
      <Pressable onPress={() => onPressItem('upload_gallery')}>
        <Text>Photo Library</Text>
      </Pressable>
      <Pressable onPress={() => onPressItem('upload_file')}>
        <Text>Document</Text>
      </Pressable>
    </React.Fragment>
  );
};

export default Gallery;
