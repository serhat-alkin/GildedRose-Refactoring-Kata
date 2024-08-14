export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class ItemUpdater {
  static readonly MAXIMUM_QUALITY = 50;
  static readonly MINIMUM_QUALITY = 0;

  static QualityByType = {
    NORMAL: 1,
    CONJURED: 2
  };

  static ItemTypes = {
    BRIE: 'Aged Brie',
    SULFURAS: 'Sulfuras, Hand of Ragnaros',
    BACKSTAGE: 'Backstage passes to a TAFKAL80ETC concert',
    CONJURED: 'Conjured',
  };

  private static validateItem(item: Item) {
    if (typeof item.quality !== 'number' || typeof item.sellIn !== 'number') {
      throw new Error("Invalid item data: 'quality' and 'sellIn' must be numbers.");
    }
  }

  static updateBrie(item: Item) {
    this.validateItem(item);
    if (item.sellIn <= 0) {
      item.quality = Math.min(item.quality + 2, this.MAXIMUM_QUALITY);
    } else {
      item.quality = Math.min(item.quality + 1, this.MAXIMUM_QUALITY);
    }

    item.sellIn -= 1;
    return item;
  }

  static updateBackstage(item: Item) {
    this.validateItem(item);
    if (item.sellIn <= 0) {
      item.quality = this.MINIMUM_QUALITY;
    } else {
      const increment = item.sellIn <= 5 ? 3 : item.sellIn <= 10 ? 2 : 1;
      item.quality = Math.min(item.quality + increment, this.MAXIMUM_QUALITY);
    }

    item.sellIn -= 1;
    return item;
  }

  static updateNormal(item: Item) {
    return this.adjustQuality(item, this.QualityByType.NORMAL);
  }

  static updateConjured(item: Item) {
    return this.adjustQuality(item, this.QualityByType.CONJURED);
  }

  private static adjustQuality(item: Item, decrement: number) {
    this.validateItem(item);
    item.quality = Math.max(item.quality - decrement, this.MINIMUM_QUALITY);
    item.sellIn -= 1;
    if (item.sellIn < 0) {
      item.quality = Math.max(item.quality - decrement, this.MINIMUM_QUALITY);
    }

    return item;
  }

  static updateSulfuras(item: Item) {
    return item;
  }
}


export class GildedRose {
  items: Array < Item > ;

  constructor(items = [] as Array < Item > ) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      switch (item.name) {
        case ItemUpdater.ItemTypes.BRIE:
          ItemUpdater.updateBrie(item);
          continue;
        case ItemUpdater.ItemTypes.SULFURAS:
          ItemUpdater.updateSulfuras(item);
          continue;
        case ItemUpdater.ItemTypes.BACKSTAGE:
          ItemUpdater.updateBackstage(item);
          continue;
        case ItemUpdater.ItemTypes.CONJURED:
          ItemUpdater.updateConjured(item);
          continue;
        default:
          ItemUpdater.updateNormal(item);
      }
    }

    return this.items
  }
}