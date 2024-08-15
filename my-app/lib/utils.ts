export const round2 = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100;

export function convertDocToObj(doc: any) {
  if (doc && doc._id) {
    doc._id = doc._id.toString();
  } else {
    console.warn('convertDocToObj: Missing _id in doc', doc);
  }
  return doc;
}

export const formatNumber = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const formatId = (x: string) => {
  return `..${x.substring(20, 24)}`;
}