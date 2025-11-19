import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface AirQualityData {
  pm25: number;
  pm10: number;
  co2: number;
  co: number;
  no2: number;
  o3: number;
  temperature: number;
  humidity: number;
  pressure: number;
}

interface Sensor {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  data: AirQualityData;
  status: 'good' | 'moderate' | 'poor' | 'hazardous';
}

const mockSensors: Sensor[] = [
  {
    id: '1',
    name: 'Датчик №1',
    location: 'ул. Центральная, Селятино',
    lat: 55.5208,
    lng: 37.2978,
    data: {
      pm25: 11.2,
      pm10: 16.8,
      co2: 410,
      co: 0.3,
      no2: 22,
      o3: 45,
      temperature: 21.3,
      humidity: 68,
      pressure: 1015
    },
    status: 'good'
  },
  {
    id: '2',
    name: 'Датчик №2',
    location: 'Киевское шоссе, Селятино',
    lat: 55.5178,
    lng: 37.3008,
    data: {
      pm25: 28.5,
      pm10: 42.3,
      co2: 520,
      co: 0.9,
      no2: 58,
      o3: 72,
      temperature: 22.8,
      humidity: 62,
      pressure: 1013
    },
    status: 'moderate'
  },
  {
    id: '3',
    name: 'Датчик №3',
    location: 'Школа №1, Селятино',
    lat: 55.5238,
    lng: 37.2948,
    data: {
      pm25: 9.5,
      pm10: 13.7,
      co2: 405,
      co: 0.2,
      no2: 19,
      o3: 41,
      temperature: 20.9,
      humidity: 71,
      pressure: 1016
    },
    status: 'good'
  },
  {
    id: '4',
    name: 'Датчик №4',
    location: 'Парк культуры, Селятино',
    lat: 55.5198,
    lng: 37.2918,
    data: {
      pm25: 7.8,
      pm10: 11.2,
      co2: 395,
      co: 0.2,
      no2: 15,
      o3: 38,
      temperature: 20.5,
      humidity: 73,
      pressure: 1017
    },
    status: 'good'
  },
  {
    id: '5',
    name: 'Датчик №5',
    location: 'Администрация, Селятино',
    lat: 55.5218,
    lng: 37.2968,
    data: {
      pm25: 10.3,
      pm10: 15.1,
      co2: 415,
      co: 0.3,
      no2: 20,
      o3: 43,
      temperature: 21.7,
      humidity: 67,
      pressure: 1014
    },
    status: 'good'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'good':
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
    case 'moderate':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    case 'poor':
      return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
    case 'hazardous':
      return 'bg-red-500/20 text-red-400 border-red-500/50';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'good':
      return 'Отлично';
    case 'moderate':
      return 'Умеренно';
    case 'poor':
      return 'Плохо';
    case 'hazardous':
      return 'Опасно';
    default:
      return 'Н/Д';
  }
};

const MetricCard = ({ icon, label, value, unit, status }: { icon: string; label: string; value: number; unit: string; status: string }) => (
  <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all hover-scale">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${status === 'good' ? 'bg-emerald-500/20' : status === 'moderate' ? 'bg-yellow-500/20' : 'bg-orange-500/20'}`}>
        <Icon name={icon} size={20} className={status === 'good' ? 'text-emerald-400' : status === 'moderate' ? 'text-yellow-400' : 'text-orange-400'} />
      </div>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-xl font-semibold">
          {value} <span className="text-sm text-muted-foreground">{unit}</span>
        </p>
      </div>
    </div>
  </Card>
);

export default function Index() {
  const [selectedSensor, setSelectedSensor] = useState<Sensor>(mockSensors[0]);
  const [activeTab, setActiveTab] = useState('dashboard');

  const calculateAQI = (pm25: number) => {
    if (pm25 <= 12) return { value: Math.round((pm25 / 12) * 50), status: 'good' };
    if (pm25 <= 35.4) return { value: Math.round(50 + ((pm25 - 12) / 23.4) * 50), status: 'moderate' };
    if (pm25 <= 55.4) return { value: Math.round(100 + ((pm25 - 35.4) / 20) * 50), status: 'poor' };
    return { value: Math.round(150 + ((pm25 - 55.4) / 100) * 100), status: 'hazardous' };
  };

  const aqi = calculateAQI(selectedSensor.data.pm25);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Icon name="Wind" size={28} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Экомониторинг Селятино</h1>
                <p className="text-sm text-muted-foreground">Система контроля качества воздуха</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className={`${getStatusColor(aqi.status)} px-4 py-2`}>
                AQI: {aqi.value}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 bg-card/50">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Icon name="LayoutDashboard" size={18} />
              <span>Мониторинг</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Icon name="BarChart3" size={18} />
              <span>Аналитика</span>
            </TabsTrigger>
            <TabsTrigger value="docs" className="flex items-center gap-2">
              <Icon name="FileText" size={18} />
              <span>Документация</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Icon name="Map" size={24} className="text-primary" />
                    Карта датчиков
                  </h2>
                  <Badge variant="outline" className="text-sm">
                    {mockSensors.length} активных датчиков
                  </Badge>
                </div>
                
                <div className="relative h-[400px] bg-muted/20 rounded-lg border border-border/50 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-8 p-8">
                      {mockSensors.map((sensor) => (
                        <button
                          key={sensor.id}
                          onClick={() => setSelectedSensor(sensor)}
                          className={`p-4 rounded-lg border-2 transition-all hover-scale ${
                            selectedSensor.id === sensor.id
                              ? 'bg-primary/20 border-primary'
                              : 'bg-card/80 border-border/50 hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-3 h-3 rounded-full animate-pulse ${
                              sensor.status === 'good' ? 'bg-emerald-400' :
                              sensor.status === 'moderate' ? 'bg-yellow-400' :
                              sensor.status === 'poor' ? 'bg-orange-400' : 'bg-red-400'
                            }`}></div>
                            <span className="font-semibold">{sensor.name}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{sensor.location}</p>
                          <Badge className={`${getStatusColor(sensor.status)} mt-2 text-xs`}>
                            {getStatusLabel(sensor.status)}
                          </Badge>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm border-border/50">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Gauge" size={20} className="text-primary" />
                  Индекс качества воздуха
                </h3>
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        className="text-muted/20"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke={aqi.status === 'good' ? '#10b981' : aqi.status === 'moderate' ? '#eab308' : '#f97316'}
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${(aqi.value / 200) * 553} 553`}
                        className="transition-all duration-1000"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-5xl font-bold">{aqi.value}</p>
                      <p className="text-sm text-muted-foreground mt-1">AQI</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(aqi.status)} text-base px-6 py-2 mt-6`}>
                    {getStatusLabel(aqi.status)}
                  </Badge>
                </div>
              </Card>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Icon name="Activity" size={24} className="text-primary" />
                Текущие показатели - {selectedSensor.name}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <MetricCard
                  icon="Droplets"
                  label="PM2.5"
                  value={selectedSensor.data.pm25}
                  unit="мкг/м³"
                  status={selectedSensor.data.pm25 <= 12 ? 'good' : selectedSensor.data.pm25 <= 35 ? 'moderate' : 'poor'}
                />
                <MetricCard
                  icon="Sparkles"
                  label="PM10"
                  value={selectedSensor.data.pm10}
                  unit="мкг/м³"
                  status={selectedSensor.data.pm10 <= 54 ? 'good' : selectedSensor.data.pm10 <= 154 ? 'moderate' : 'poor'}
                />
                <MetricCard
                  icon="Cloud"
                  label="CO₂"
                  value={selectedSensor.data.co2}
                  unit="ppm"
                  status={selectedSensor.data.co2 <= 600 ? 'good' : selectedSensor.data.co2 <= 1000 ? 'moderate' : 'poor'}
                />
                <MetricCard
                  icon="Flame"
                  label="CO"
                  value={selectedSensor.data.co}
                  unit="ppm"
                  status={selectedSensor.data.co <= 1 ? 'good' : selectedSensor.data.co <= 2 ? 'moderate' : 'poor'}
                />
                <MetricCard
                  icon="Zap"
                  label="NO₂"
                  value={selectedSensor.data.no2}
                  unit="ppb"
                  status={selectedSensor.data.no2 <= 53 ? 'good' : selectedSensor.data.no2 <= 100 ? 'moderate' : 'poor'}
                />
                <MetricCard
                  icon="Sun"
                  label="O₃"
                  value={selectedSensor.data.o3}
                  unit="ppb"
                  status={selectedSensor.data.o3 <= 54 ? 'good' : selectedSensor.data.o3 <= 70 ? 'moderate' : 'poor'}
                />
                <MetricCard
                  icon="Thermometer"
                  label="Температура"
                  value={selectedSensor.data.temperature}
                  unit="°C"
                  status="good"
                />
                <MetricCard
                  icon="CloudRain"
                  label="Влажность"
                  value={selectedSensor.data.humidity}
                  unit="%"
                  status="good"
                />
                <MetricCard
                  icon="Gauge"
                  label="Давление"
                  value={selectedSensor.data.pressure}
                  unit="гПа"
                  status="good"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 animate-fade-in">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon name="TrendingUp" size={20} className="text-primary" />
                  Динамика PM2.5
                </h3>
                <div className="h-64 flex items-end gap-2 px-4">
                  {[15, 22, 18, 28, 35, 42, 38, 45, 40, 35, 30, 25].map((value, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-gradient-to-t from-primary to-secondary rounded-t-lg transition-all hover:opacity-80"
                        style={{ height: `${(value / 50) * 100}%` }}
                      ></div>
                      <span className="text-xs text-muted-foreground">{index + 1}</span>
                    </div>
                  ))}
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">Последние 12 часов</p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon name="PieChart" size={20} className="text-secondary" />
                  Распределение качества воздуха
                </h3>
                <div className="flex items-center justify-center h-64">
                  <div className="space-y-4 w-full">
                    {[
                      { label: 'Отлично', value: 45, color: 'bg-emerald-500' },
                      { label: 'Умеренно', value: 30, color: 'bg-yellow-500' },
                      { label: 'Плохо', value: 20, color: 'bg-orange-500' },
                      { label: 'Опасно', value: 5, color: 'bg-red-500' }
                    ].map((item) => (
                      <div key={item.label} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{item.label}</span>
                          <span className="font-semibold">{item.value}%</span>
                        </div>
                        <div className="h-3 bg-muted/20 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${item.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="lg:col-span-2 p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon name="AlertTriangle" size={20} className="text-yellow-400" />
                  Сводка по всем датчикам
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {mockSensors.map((sensor) => (
                    <div
                      key={sensor.id}
                      className="p-4 rounded-lg bg-muted/20 border border-border/50 hover:border-primary/50 transition-all hover-scale"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{sensor.name}</h4>
                        <div className={`w-2 h-2 rounded-full ${
                          sensor.status === 'good' ? 'bg-emerald-400' :
                          sensor.status === 'moderate' ? 'bg-yellow-400' :
                          sensor.status === 'poor' ? 'bg-orange-400' : 'bg-red-400'
                        }`}></div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{sensor.location}</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">PM2.5:</span>
                          <span className="font-medium">{sensor.data.pm25} мкг/м³</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">CO₂:</span>
                          <span className="font-medium">{sensor.data.co2} ppm</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="docs" className="space-y-6 animate-fade-in">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Icon name="BookOpen" size={28} className="text-primary" />
                Техническая документация
              </h2>
              
              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Info" size={20} className="text-secondary" />
                    О системе
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Система экологического мониторинга в поселении Селятино обеспечивает контроль качества воздуха 
                    в режиме реального времени. Сеть из 5 датчиков, расположенных в ключевых точках поселения, 
                    отслеживает 9 параметров воздуха и предоставляет данные для принятия управленческих решений 
                    администрацией поселения.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Cpu" size={20} className="text-secondary" />
                    Отслеживаемые параметры
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { name: 'PM2.5', desc: 'Твердые частицы размером 2.5 мкм', unit: 'мкг/м³' },
                      { name: 'PM10', desc: 'Твердые частицы размером 10 мкм', unit: 'мкг/м³' },
                      { name: 'CO₂', desc: 'Углекислый газ', unit: 'ppm' },
                      { name: 'CO', desc: 'Угарный газ', unit: 'ppm' },
                      { name: 'NO₂', desc: 'Диоксид азота', unit: 'ppb' },
                      { name: 'O₃', desc: 'Озон', unit: 'ppb' },
                      { name: 'Температура', desc: 'Температура окружающей среды', unit: '°C' },
                      { name: 'Влажность', desc: 'Относительная влажность воздуха', unit: '%' },
                      { name: 'Давление', desc: 'Атмосферное давление', unit: 'гПа' }
                    ].map((param) => (
                      <div key={param.name} className="p-4 rounded-lg bg-muted/20 border border-border/50">
                        <h4 className="font-semibold text-primary mb-1">{param.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{param.desc}</p>
                        <Badge variant="outline" className="text-xs">{param.unit}</Badge>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Target" size={20} className="text-secondary" />
                    Индекс качества воздуха (AQI)
                  </h3>
                  <div className="space-y-2">
                    {[
                      { range: '0-50', status: 'Отлично', color: 'bg-emerald-500', desc: 'Качество воздуха считается удовлетворительным' },
                      { range: '51-100', status: 'Умеренно', color: 'bg-yellow-500', desc: 'Приемлемое качество воздуха для большинства' },
                      { range: '101-150', status: 'Плохо', color: 'bg-orange-500', desc: 'Чувствительные группы могут испытывать дискомфорт' },
                      { range: '151+', status: 'Опасно', color: 'bg-red-500', desc: 'Риск для здоровья всех людей' }
                    ].map((level) => (
                      <div key={level.range} className="flex items-center gap-4 p-3 rounded-lg bg-muted/20">
                        <div className={`w-12 h-12 rounded-lg ${level.color} flex items-center justify-center text-white font-bold text-sm`}>
                          {level.range}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{level.status}</p>
                          <p className="text-sm text-muted-foreground">{level.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Wrench" size={20} className="text-secondary" />
                    Модуль разработки
                  </h3>
                  <div className="p-4 rounded-lg bg-muted/20 border border-border/50 space-y-3">
                    <p className="text-muted-foreground">
                      Платформа построена на современном технологическом стеке:
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-primary mt-0.5" />
                        <span><strong>Frontend:</strong> React + TypeScript + Tailwind CSS для создания адаптивного интерфейса</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-primary mt-0.5" />
                        <span><strong>Backend:</strong> Cloud Functions для обработки данных с датчиков</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-primary mt-0.5" />
                        <span><strong>База данных:</strong> PostgreSQL для хранения исторических данных</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-primary mt-0.5" />
                        <span><strong>Визуализация:</strong> Кастомные графики и диаграммы для анализа трендов</span>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-md mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="Wind" size={20} className="text-primary" />
              <span>© 2024 Администрация городского поселения Селятино. Экомониторинг</span>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-xs">v1.0.0</Badge>
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                Все системы работают
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}