const days = ['monday','tuesday','wendsday','thursday','friday','saturday','sunday'];
const moths = ['january','february','april','may','june','july','agust','september','october','november','december'];

const formateDate = (data) => {
    const date = new Date(data);
    const day = days[date.getDay() - 1];
    const month = moths[date.getMonth() - 1];

    return `${day.charAt(0).toUpperCase() + day.slice(1)}, ${month.charAt(0).toUpperCase() + month.slice(1)} ${date.getFullYear()}`;
}

const shortenText = (text, length) => {
    if(text.length > length) {
        return `${text.slice(0,length)}...`;
    }
    return text;
}

export {formateDate,shortenText};