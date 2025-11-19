import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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

interface EcoProblem {
  id: string;
  type: 'trash' | 'road' | 'snow' | 'park' | 'water' | 'noise';
  title: string;
  location: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'in_progress' | 'resolved';
  reportedDate: string;
  reportedBy: string;
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

const mockProblems: EcoProblem[] = [
  {
    id: '1',
    type: 'trash',
    title: 'Переполнены мусорные контейнеры',
    location: 'ул. Центральная, д. 12',
    description: 'Мусорные контейнеры переполнены более 3 дней. Мусор разбросан вокруг площадки.',
    severity: 'high',
    status: 'new',
    reportedDate: '2024-11-18',
    reportedBy: 'Жители дома'
  },
  {
    id: '2',
    type: 'road',
    title: 'Разбитая дорога с выбоинами',
    location: 'Киевское шоссе, участок 500м',
    description: 'Глубокие выбоины на дорожном полотне создают аварийную ситуацию. Повреждена дренажная система.',
    severity: 'critical',
    status: 'in_progress',
    reportedDate: '2024-11-15',
    reportedBy: 'Дорожная служба'
  },
  {
    id: '3',
    type: 'snow',
    title: 'Не расчищен тротуар от снега',
    location: 'ул. Школьная, от дома 5 до дома 15',
    description: 'Тротуар не очищен от снега и наледи. Затруднен проход пешеходов.',
    severity: 'medium',
    status: 'new',
    reportedDate: '2024-11-17',
    reportedBy: 'Жители'
  },
  {
    id: '4',
    type: 'park',
    title: 'Загрязнение парка культуры',
    location: 'Парк культуры, зона отдыха',
    description: 'Обнаружен несанкционированный сброс строительного мусора. Повреждены газоны.',
    severity: 'high',
    status: 'new',
    reportedDate: '2024-11-18',
    reportedBy: 'Служба благоустройства'
  },
  {
    id: '5',
    type: 'water',
    title: 'Утечка воды из водопровода',
    location: 'ул. Центральная, д. 8',
    description: 'Обнаружена утечка воды. Образовалась наледь на тротуаре.',
    severity: 'critical',
    status: 'in_progress',
    reportedDate: '2024-11-16',
    reportedBy: 'ЖКХ'
  },
  {
    id: '6',
    type: 'road',
    title: 'Разрушенный бордюр',
    location: 'ул. Молодежная, д. 20',
    description: 'Разрушен бордюрный камень на протяжении 15 метров.',
    severity: 'medium',
    status: 'new',
    reportedDate: '2024-11-18',
    reportedBy: 'Жители'
  },
  {
    id: '7',
    type: 'trash',
    title: 'Стихийная свалка',
    location: 'Лесопарковая зона, северная часть',
    description: 'Образовалась несанкционированная свалка бытовых отходов объемом около 5 куб.м.',
    severity: 'critical',
    status: 'new',
    reportedDate: '2024-11-17',
    reportedBy: 'Экологический патруль'
  },
  {
    id: '8',
    type: 'noise',
    title: 'Превышение шумовых норм',
    location: 'Киевское шоссе, жилая зона',
    description: 'Постоянное превышение допустимого уровня шума от автотранспорта в ночное время.',
    severity: 'medium',
    status: 'in_progress',
    reportedDate: '2024-11-14',
    reportedBy: 'Жители'
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

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'low':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    case 'medium':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    case 'high':
      return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
    case 'critical':
      return 'bg-red-500/20 text-red-400 border-red-500/50';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
  }
};

const getSeverityLabel = (severity: string) => {
  switch (severity) {
    case 'low':
      return 'Низкий';
    case 'medium':
      return 'Средний';
    case 'high':
      return 'Высокий';
    case 'critical':
      return 'Критический';
    default:
      return 'Н/Д';
  }
};

const getProblemStatusLabel = (status: string) => {
  switch (status) {
    case 'new':
      return 'Новая';
    case 'in_progress':
      return 'В работе';
    case 'resolved':
      return 'Решена';
    default:
      return 'Н/Д';
  }
};

const getProblemTypeIcon = (type: string) => {
  switch (type) {
    case 'trash':
      return 'Trash2';
    case 'road':
      return 'Construction';
    case 'snow':
      return 'Snowflake';
    case 'park':
      return 'Trees';
    case 'water':
      return 'Droplet';
    case 'noise':
      return 'Volume2';
    default:
      return 'AlertTriangle';
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
  const [problemFilter, setProblemFilter] = useState<string>('all');

  const calculateAQI = (pm25: number) => {
    if (pm25 <= 12) return { value: Math.round((pm25 / 12) * 50), status: 'good' };
    if (pm25 <= 35.4) return { value: Math.round(50 + ((pm25 - 12) / 23.4) * 50), status: 'moderate' };
    if (pm25 <= 55.4) return { value: Math.round(100 + ((pm25 - 35.4) / 20) * 50), status: 'poor' };
    return { value: Math.round(150 + ((pm25 - 55.4) / 100) * 100), status: 'hazardous' };
  };

  const aqi = calculateAQI(selectedSensor.data.pm25);

  const filteredProblems = problemFilter === 'all' 
    ? mockProblems 
    : mockProblems.filter(p => p.type === problemFilter);

  const problemStats = {
    total: mockProblems.length,
    new: mockProblems.filter(p => p.status === 'new').length,
    inProgress: mockProblems.filter(p => p.status === 'in_progress').length,
    critical: mockProblems.filter(p => p.severity === 'critical').length
  };

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
                <p className="text-sm text-muted-foreground">Комплексная система экологического контроля</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className={`${getStatusColor(aqi.status)} px-4 py-2`}>
                AQI: {aqi.value}
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                <Icon name="AlertCircle" size={16} className="mr-1" />
                {problemStats.new} новых проблем
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4 bg-card/50">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Icon name="LayoutDashboard" size={18} />
              <span className="hidden sm:inline">Воздух</span>
            </TabsTrigger>
            <TabsTrigger value="problems" className="flex items-center gap-2">
              <Icon name="AlertTriangle" size={18} />
              <span className="hidden sm:inline">Проблемы</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Icon name="BarChart3" size={18} />
              <span className="hidden sm:inline">Аналитика</span>
            </TabsTrigger>
            <TabsTrigger value="docs" className="flex items-center gap-2">
              <Icon name="FileText" size={18} />
              <span className="hidden sm:inline">Документы</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Icon name="Map" size={24} className="text-primary" />
                    Карта датчиков качества воздуха
                  </h2>
                  <Badge variant="outline" className="text-sm">
                    {mockSensors.length} активных датчиков
                  </Badge>
                </div>
                
                <div className="relative h-[400px] bg-muted/20 rounded-lg border border-border/50 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-6 p-6">
                      {mockSensors.slice(0, 4).map((sensor) => (
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
                            <span className="font-semibold text-sm">{sensor.name}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{sensor.location}</p>
                          <Badge className={`${getStatusColor(sensor.status)} text-xs`}>
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

          <TabsContent value="problems" className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Icon name="AlertTriangle" size={24} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{problemStats.total}</p>
                    <p className="text-sm text-muted-foreground">Всего проблем</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-yellow-500/20">
                    <Icon name="Clock" size={24} className="text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{problemStats.new}</p>
                    <p className="text-sm text-muted-foreground">Новых</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/20">
                    <Icon name="Settings" size={24} className="text-orange-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{problemStats.inProgress}</p>
                    <p className="text-sm text-muted-foreground">В работе</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-500/20">
                    <Icon name="AlertCircle" size={24} className="text-red-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{problemStats.critical}</p>
                    <p className="text-sm text-muted-foreground">Критичных</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Icon name="ListFilter" size={24} className="text-primary" />
                  Экологические проблемы поселения
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant={problemFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setProblemFilter('all')}
                  >
                    Все
                  </Button>
                  <Button
                    variant={problemFilter === 'trash' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setProblemFilter('trash')}
                  >
                    <Icon name="Trash2" size={16} className="mr-1" />
                    Мусор
                  </Button>
                  <Button
                    variant={problemFilter === 'road' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setProblemFilter('road')}
                  >
                    <Icon name="Construction" size={16} className="mr-1" />
                    Дороги
                  </Button>
                  <Button
                    variant={problemFilter === 'park' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setProblemFilter('park')}
                  >
                    <Icon name="Trees" size={16} className="mr-1" />
                    Парки
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredProblems.map((problem) => (
                  <Card key={problem.id} className="p-4 bg-muted/20 border-border/50 hover:border-primary/50 transition-all hover-scale">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${getSeverityColor(problem.severity)}`}>
                        <Icon name={getProblemTypeIcon(problem.type)} size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{problem.title}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              <Icon name="MapPin" size={14} />
                              {problem.location}
                            </p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Badge className={getSeverityColor(problem.severity)}>
                              {getSeverityLabel(problem.severity)}
                            </Badge>
                            <Badge variant="outline">
                              {getProblemStatusLabel(problem.status)}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{problem.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Icon name="Calendar" size={12} />
                            {new Date(problem.reportedDate).toLocaleDateString('ru-RU')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="User" size={12} />
                            {problem.reportedBy}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 animate-fade-in">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon name="TrendingUp" size={20} className="text-primary" />
                  Динамика PM2.5 (последние 12 часов)
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
                <p className="text-center text-sm text-muted-foreground mt-4">Часы</p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon name="PieChart" size={20} className="text-secondary" />
                  Распределение проблем по типам
                </h3>
                <div className="flex items-center justify-center h-64">
                  <div className="space-y-4 w-full">
                    {[
                      { label: 'Мусор и отходы', value: 25, color: 'bg-red-500', count: 2 },
                      { label: 'Дороги', value: 25, color: 'bg-orange-500', count: 2 },
                      { label: 'Снег/Лед', value: 12.5, color: 'bg-blue-500', count: 1 },
                      { label: 'Парки/Скверы', value: 12.5, color: 'bg-emerald-500', count: 1 },
                      { label: 'Водоснабжение', value: 12.5, color: 'bg-cyan-500', count: 1 },
                      { label: 'Шум', value: 12.5, color: 'bg-purple-500', count: 1 }
                    ].map((item) => (
                      <div key={item.label} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{item.label}</span>
                          <span className="font-semibold">{item.count} ({item.value}%)</span>
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
                  Сводка по датчикам качества воздуха
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
                Техническая документация системы
              </h2>
              
              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Info" size={20} className="text-secondary" />
                    О системе экомониторинга
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Система экологического мониторинга в поселении Селятино обеспечивает контроль качества воздуха 
                    в режиме реального времени. Сеть из 5 датчиков, расположенных в ключевых точках поселения, 
                    отслеживает 9 параметров воздуха и предоставляет данные для принятия управленческих решений 
                    администрацией поселения. Дополнительно реализован модуль учета и контроля экологических проблем 
                    городской среды.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Layers" size={20} className="text-secondary" />
                    Модули системы
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
                      <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                        <Icon name="Wind" size={18} />
                        Мониторинг воздуха
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Непрерывный контроль качества воздуха с отслеживанием PM2.5, PM10, CO2, CO, NO2, O3, 
                        температуры, влажности и давления
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
                      <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                        <Icon name="AlertTriangle" size={18} />
                        Учет экопроблем
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Регистрация и отслеживание проблем: переполненные мусорки, разбитые дороги, 
                        неубранный снег, загрязнения парков и другие нарушения
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
                      <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                        <Icon name="BarChart3" size={18} />
                        Аналитика
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Визуализация данных, построение трендов, статистика по проблемам 
                        для принятия обоснованных решений
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
                      <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                        <Icon name="Bell" size={18} />
                        Уведомления
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Автоматические оповещения при превышении нормативов качества воздуха 
                        и критических экологических проблемах
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Cpu" size={20} className="text-secondary" />
                    Отслеживаемые параметры воздуха
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { name: 'PM2.5', desc: 'Твердые частицы размером 2.5 мкм', unit: 'мкг/м³', norm: '≤12' },
                      { name: 'PM10', desc: 'Твердые частицы размером 10 мкм', unit: 'мкг/м³', norm: '≤54' },
                      { name: 'CO₂', desc: 'Углекислый газ', unit: 'ppm', norm: '≤600' },
                      { name: 'CO', desc: 'Угарный газ', unit: 'ppm', norm: '≤1' },
                      { name: 'NO₂', desc: 'Диоксид азота', unit: 'ppb', norm: '≤53' },
                      { name: 'O₃', desc: 'Озон', unit: 'ppb', norm: '≤54' },
                      { name: 'Температура', desc: 'Температура окружающей среды', unit: '°C', norm: '-' },
                      { name: 'Влажность', desc: 'Относительная влажность воздуха', unit: '%', norm: '40-60' },
                      { name: 'Давление', desc: 'Атмосферное давление', unit: 'гПа', norm: '1013±20' }
                    ].map((param) => (
                      <div key={param.name} className="p-4 rounded-lg bg-muted/20 border border-border/50">
                        <h4 className="font-semibold text-primary mb-1">{param.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{param.desc}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">{param.unit}</Badge>
                          <span className="text-xs text-muted-foreground">Норма: {param.norm}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Icon name="ListChecks" size={20} className="text-secondary" />
                    Типы экологических проблем
                  </h3>
                  <div className="space-y-3">
                    {[
                      { icon: 'Trash2', type: 'Отходы и мусор', desc: 'Переполненные контейнеры, несанкционированные свалки' },
                      { icon: 'Construction', type: 'Дороги и тротуары', desc: 'Выбоины, разрушенное покрытие, поврежденные бордюры' },
                      { icon: 'Snowflake', type: 'Уборка снега', desc: 'Неубранный снег, наледь на тротуарах и дорогах' },
                      { icon: 'Trees', type: 'Парки и зеленые зоны', desc: 'Загрязнение парков, повреждение газонов' },
                      { icon: 'Droplet', type: 'Водоснабжение', desc: 'Утечки воды, аварии на водопроводе' },
                      { icon: 'Volume2', type: 'Шумовое загрязнение', desc: 'Превышение допустимых уровней шума' }
                    ].map((item) => (
                      <div key={item.type} className="flex items-start gap-4 p-3 rounded-lg bg-muted/20">
                        <div className="p-2 rounded-lg bg-primary/20">
                          <Icon name={item.icon} size={20} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{item.type}</p>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
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
                    Технологический стек
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
                        <span><strong>База данных:</strong> PostgreSQL для хранения исторических данных и реестра проблем</span>
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
              <Badge variant="outline" className="text-xs">v2.0.0</Badge>
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
