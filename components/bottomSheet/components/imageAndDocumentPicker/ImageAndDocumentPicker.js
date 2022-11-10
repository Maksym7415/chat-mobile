/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Pressable,
  Text,
  Alert,
  View,
  TouchableOpacity,
  Image,
  Video,
} from 'react-native';
import {useTheme, Icon, Divider} from 'react-native-paper';
import makeStyles from './styles';
import {useSelector} from 'react-redux';
import * as config from './config';
import ImagePicker from 'react-native-image-crop-picker';
import {extractSourceFromFile, uuid} from '../../../../helpers';
import {Keyboard} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const ImageAndDocumentPicker = React.forwardRef(
  ({onClose, exclud = []}, ref) => {
    // HOOKS
    const theme = useTheme();

    // STYLES
    const styles = makeStyles(theme);

    // SELECTORS
    const {lang} = useSelector(({settingSlice}) => settingSlice);

    const [media, setMedia] = React.useState([]);
    const [mediaSources, setMediaSources] = React.useState([]);
    // FUNCTIONS
    const onSelectAttachment = () => {};

    const openCamera = () => {
      ImagePicker.openCamera({
        compressImageMaxHeight: 1100,
        compressImageMaxWidth: 1100,
        cropping: true,
      })
        .then(image => {
          console.log(image, 'image');
        })
        .catch(error => {
          console.log(error.message);
          Alert.alert(error.message);
        });
    };
    const openGallery = () => {
      ImagePicker.openPicker({
        multiple: true,
      })
        .then(images => imagesSet(images))
        .catch(error => {
          console.log(error.message);
          Alert.alert(error.message);
        });
    };

    const imagesSet = images => {
      // images.map(item => {
      //   const {source, mime, filename, uri} = extractSourceFromFile(item);
      // })
      setMedia(images);
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
      Keyboard.dismiss();
      // ref.current.close();
      switch (itemType) {
        case config.typesActionBtn.uploadCamera:
          return openCamera();
        case config.typesActionBtn.uploadGallery:
          return openGallery();
        case config.typesActionBtn.uploadFile:
          return openDocument();
        default:
          return;
      }
    };

    const actionsBtnsFiltred = config
      .actionsBtns(lang)
      .filter(el => !exclud.includes(el.typeAction));

    return (
      <View style={styles.container}>
        {actionsBtnsFiltred.map((item, index) => {
          return actionsBtnsFiltred.length > index + 1 ? (
            <React.Fragment key={uuid()}>
              <Pressable
                onPress={() => onPressItem(item.typeAction)}
                style={styles.btn}>
                <Text style={styles.title}>{item.title}</Text>
              </Pressable>
              <Divider style={styles.divider} />
            </React.Fragment>
          ) : (
            <Pressable
              onPress={() => onPressItem(item.typeAction)}
              key={uuid()}
              style={styles.btn}>
              <Text style={styles.title}>{item.title}</Text>
            </Pressable>
          );
        })}
        {/* {media.map((singleMedia, index) => {
        const {source, mime} = singleMedia;
        console.log(singleMedia, 'singleMedia');
        if (mime.startsWith('image')) {
          return (
            <TouchableOpacity
              key={source}
              activeOpacity={0.9}
              // onPress={() => onMediaPress(index)}
              style={styles.imageItemcontainer}>
              <Image
                style={{...styles.imageItem, width: 100, height: 100}}
                source={{
                  uri: singleMedia.path,
                }}
              />
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity
              key={source}
              activeOpacity={0.9}
              // onPress={() => onMediaPress(index)}
              style={styles.imageItemcontainer}>
              <Video
                source={{
                  uri: source,
                }}
                resizeMode={'cover'}
                shouldPlay={false}
                isMuted={true}
                style={styles.imageItem}
              />
            </TouchableOpacity>
          );
        }
      })} */}
      </View>
    );
  },
);

export default ImageAndDocumentPicker;
