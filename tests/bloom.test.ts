import BloomFilter from '../src/bloom'

let bloomFilter = new BloomFilter(32);

test('add and fliter email to bloomfilter', () => {
    bloomFilter.add('test@test.com');
    bloomFilter.add('test1@test.com');
    bloomFilter.add('test2@test.com');
    bloomFilter.add('test3@test.com');
    expect(bloomFilter.contains('test@test.com')).toBe(true);
    expect(bloomFilter.contains('test1@test.com')).toBe(true);
    expect(bloomFilter.contains('test2@test.com')).toBe(true);
    expect(bloomFilter.contains('test3@test.com')).toBe(true);
    expect(bloomFilter.contains('test4@test.com')).toBe(false);
});