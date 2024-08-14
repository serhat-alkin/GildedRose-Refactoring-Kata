import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });

  it('should increase the quality of "Aged Brie" as it gets older', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 2, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
  });

  it('should not increase the quality of an item above 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 2, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it('should increase the quality of "Aged Brie" by 2 when sellIn is 0 or negative', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 0, 48)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it('should increase the quality of "Aged Brie" correctly without exceeding 50 when starting from 49', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 2, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it('increases quality by 1 when more than 10 days left', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(11);
  });

  it('increases quality by 2 when 10 days or less left', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(12);
  });

  it('increases quality by 3 when 5 days or less left', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(13);
  });

  it('sets quality to 0 after the concert', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(0);
  });

  it('should degrade quality twice for the normal item', () => {
    const gildedRose = new GildedRose([new Item('-2 Normal', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
  });

  it('should not allow the quality of an normal item to be negative', () => {
    const gildedRose = new GildedRose([new Item('Normal not negative', 5, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('"Sulfuras" should never decrease in quality or sellIn', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(0);
  });

  it('should degrade Conjured items twice as fast as normal items', () => {
    const gildedRose = new GildedRose([new Item('Conjured', 3, 6)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(4);
  });
});
