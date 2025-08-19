import React, { useState } from 'react';
import { Search, MapPin, Star, Clock, Filter, Menu, X } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

// 聖地データ
const sacredPlaces = [
  {
    id: 1,
    name: '清水寺',
    location: '京都市東山区',
    category: '寺院',
    rating: 4.8,
    visitTime: '2-3時間',
    description: '世界遺産にも登録されている美しい寺院。有名な舞台からの景色は絶景です。',
    image: 'https://images.unsplash.com/photo-1702060847389-f3819611a56a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHRlbXBsZSUyMHRyYWRpdGlvbmFsJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1NTU1MTcxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['世界遺産', '桜', '紅葉']
  },
  {
    id: 2,
    name: '伏見稲荷大社',
    location: '京都市伏見区',
    category: '神社',
    rating: 4.7,
    visitTime: '1-2時間',
    description: '千本鳥居で有名な稲荷神社の総本宮。朱色の鳥居が山頂まで続きます。',
    image: 'https://images.unsplash.com/photo-1698791703689-c3f4fa2f5bc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHNocmluZSUyMHRvcmlpJTIwZ2F0ZXxlbnwxfHx8fDE3NTU1NzYxMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['鳥居', '稲荷神社', 'ハイキング']
  },
  {
    id: 3,
    name: '嵯峨野竹林',
    location: '京都市右京区',
    category: '自然',
    rating: 4.6,
    visitTime: '1時間',
    description: '美しい竹林の道。太陽の光が竹の間から差し込む幻想的な景色を楽しめます。',
    image: 'https://images.unsplash.com/photo-1516747387164-f3ce32cb65fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGdhcmRlbiUyMHBlYWNlZnVsJTIwbmF0dXJlfGVufDF8fHx8MTc1NTU3NjE0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['竹林', '散歩', 'インスタ映え']
  },
  {
    id: 4,
    name: '姫路城',
    location: '兵庫県姫路市',
    category: '城郭',
    rating: 4.9,
    visitTime: '2-3時間',
    description: '世界遺産の白鷺城。美しい白壁と優雅な姿で日本の城の代表格です。',
    image: 'https://images.unsplash.com/photo-1710197608742-487d2cece748?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGNhc3RsZSUyMHRyYWRpdGlvbmFsJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzU1NTc2MTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['世界遺産', '城', '歴史']
  }
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const filteredPlaces = sacredPlaces.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         place.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(sacredPlaces.map(place => place.category))];

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-primary" />
              <h1 className="text-xl md:text-2xl font-bold text-primary">聖地ナビゲーター</h1>
            </div>
            
            {/* デスクトップナビ */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors">ホーム</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">スポット一覧</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">マップ</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">お気に入り</a>
            </nav>

            {/* モバイルメニューボタン */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* モバイルメニュー */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white">
            <nav className="px-4 py-2 space-y-2">
              <a href="#" className="block py-2 text-foreground hover:text-primary transition-colors">ホーム</a>
              <a href="#" className="block py-2 text-foreground hover:text-primary transition-colors">スポット一覧</a>
              <a href="#" className="block py-2 text-foreground hover:text-primary transition-colors">マップ</a>
              <a href="#" className="block py-2 text-foreground hover:text-primary transition-colors">お気に入り</a>
            </nav>
          </div>
        )}
      </header>

      {/* ヒーローセクション */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1698791703689-c3f4fa2f5bc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHNocmluZSUyMHRvcmlpJTIwZ2F0ZXxlbnwxfHx8fDE3NTU1NzYxMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="聖地巡礼"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl text-white mb-4">
              あなたの聖地巡礼を<br className="md:hidden" />サポートします
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              近隣の神聖な場所を発見し、心に残る体験をお届けします
            </p>
            
            {/* 検索バー */}
            <div className="max-w-2xl mx-auto bg-white rounded-lg p-2 flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="場所や名前で検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-0 focus-visible:ring-0"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-40 border-0 focus:ring-0">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="カテゴリー" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全て</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* スポット一覧 */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl mb-4">おすすめの聖地スポット</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              歴史ある寺社仏閣から美しい自然まで、心を癒す特別な場所をご紹介します
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlaces.map((place) => (
              <Card 
                key={place.id} 
                className="group cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => setSelectedPlace(place)}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={place.image}
                    alt={place.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-white/90">
                      {place.category}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{place.rating}</span>
                    </div>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{place.name}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {place.location}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {place.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {place.visitTime}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {place.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {place.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{place.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPlaces.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                検索条件に合うスポットが見つかりませんでした
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA セクション */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-2xl md:text-3xl mb-4">もっと多くの聖地を発見しませんか？</h3>
          <p className="text-lg opacity-90 mb-8">
            お気に入りの場所を保存したり、レビューを投稿したりして、<br className="hidden md:block" />
            コミュニティと体験を共有しましょう
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              会員登録
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              マップを見る
            </Button>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-muted py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">聖地ナビゲーター</span>
              </div>
              <p className="text-muted-foreground">
                あなたの心に響く聖地を見つけ、特別な体験をお届けするプラットフォームです。
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">サービス</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">スポット検索</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">ルートプランナー</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">レビュー投稿</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">サポート</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">ヘルプセンター</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">お問い合わせ</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">プライバシーポリシー</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 聖地ナビゲーター. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}