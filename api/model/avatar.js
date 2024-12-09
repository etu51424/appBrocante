import sharp from 'sharp';

export const saveAvatar = async (imageBuffer, imageName, destFolder) => {
    return sharp(imageBuffer)
        .jpeg()
        .resize({
            fit: 'inside',
            width: 500,
            height: 500
        })
        .toFile(`${destFolder}/${imageName}.jpeg`);
}