import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Page = "landing" | "signup";

const GYM_LOGO = require("@/assets/images/gym_app_logo.png");

const TYPING_TEXT = "Welcome to GymForge.";

// Blinking cursor
function BlinkingCursor() {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return <Animated.View style={{ opacity }} className="w-px h-4 bg-white/60 ml-0.5" />;
}

function LandingPage({ onStart }: { onStart: () => void }) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const glowAnim = useRef(new Animated.Value(0)).current;

  // Typing effect
  useEffect(() => {
    if (index < TYPING_TEXT.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + TYPING_TEXT[index]);
        setIndex((prev) => prev + 1);
      }, 75);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  // Pulse on headline
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const headlineOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.85, 1],
  });

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 px-7 justify-between py-8">

        {/* Top logo */}
        <View className="flex-row items-center gap-x-2.5">
          <View className="w-9 h-9 rounded-xl bg-white/8 border border-white/15 items-center justify-center">
            <Image source={GYM_LOGO} className="w-6 h-6" resizeMode="contain" />
          </View>
          <Text className="text-white/60 text-sm font-medium tracking-widest uppercase">
            GYMFORGe
          </Text>
        </View>

        {/* Center main content */}
        <View className="gap-y-4">
          {/* Est label */}
          <View className="flex-row items-center gap-x-2">
            <View className="w-6 h-px bg-white/30" />
            <Text className="text-white/40 text-xs tracking-widest uppercase font-medium">
              Est. 2026
            </Text>
          </View>

          {/* Big headline */}
          <Animated.View style={{ opacity: headlineOpacity }}>
            <Text className="text-white font-bold leading-none" style={{ fontSize: 52, letterSpacing: -1.5 }}>
              THE{"\n"}GRIND{"\n"}NEVER{"\n"}STOPS.
            </Text>
          </Animated.View>

          {/* Typing text */}
          <View className="flex-row items-center mt-1">
            <Text className="text-white/45 text-base font-light tracking-wide">
              {displayedText}
            </Text>
            {index < TYPING_TEXT.length && <BlinkingCursor />}
          </View>

          {/* Eyebrow pill */}
          <View className="flex-row items-center gap-x-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 self-start mt-2">
            <View className="w-2 h-2 rounded-full bg-white" />
            <Text className="text-white/80 text-xs font-medium uppercase tracking-widest">
              Your Fitness Companion
            </Text>
          </View>

          {/* Make your body heading */}
          <Text className="text-white text-4xl font-bold leading-tight">
            Make your body{" "}
            <Text className="text-white/50">healthier</Text>
            {"\n"}and stronger
          </Text>

          {/* Subtitle */}
          <Text className="text-white/60 text-base leading-6">
            Track workouts, log weights, build habits, and transform your physique —
            all in one powerful app.
          </Text>
        </View>

        {/* Bottom section */}
        <View className="gap-y-3">
          <View className="h-px bg-white/10 mb-2" />

          <Pressable
            onPress={onStart}
            className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 items-center active:opacity-70"
          >
            <Text className="text-white text-lg font-semibold">
              Get Started →
            </Text>
          </Pressable>

          <Text className="text-center text-white/40 text-sm">
            Already have an account?{" "}
            <Text onPress={onStart} className="text-white font-semibold">
              Sign In
            </Text>
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

function SignUpPage({ onBack }: { onBack: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#0a0a0a]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-7 pb-10"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back button */}
          <View className="pt-4 pb-8">
            <Pressable
              onPress={onBack}
              className="w-10 h-10 rounded-xl bg-white/6 border border-white/10 items-center justify-center active:opacity-60"
            >
              <Text className="text-white text-lg">←</Text>
            </Pressable>
          </View>

          {/* Header */}
          <View className="mb-9">
            <Text className="text-white text-3xl font-bold tracking-tight mb-2">
              Create account
            </Text>
            <Text className="text-white/40 text-sm">
              Start your fitness journey today
            </Text>
          </View>

          {/* Form */}
          <View className="gap-y-4">
            {/* Name */}
            <View>
              <Text className="text-white/50 text-xs font-medium tracking-widest uppercase mb-2">
                Full name
              </Text>
              <TextInput
                placeholder="Your name"
                placeholderTextColor="rgba(255,255,255,0.25)"
                value={name}
                onChangeText={setName}
                className="w-full bg-white/5 border border-white/12 rounded-2xl px-4 py-3.5 text-white text-base"
              />
            </View>

            {/* Email */}
            <View>
              <Text className="text-white/50 text-xs font-medium tracking-widest uppercase mb-2">
                Email
              </Text>
              <TextInput
                placeholder="you@email.com"
                placeholderTextColor="rgba(255,255,255,0.25)"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                className="w-full bg-white/5 border border-white/12 rounded-2xl px-4 py-3.5 text-white text-base"
              />
            </View>

            {/* Password */}
            <View>
              <Text className="text-white/50 text-xs font-medium tracking-widest uppercase mb-2">
                Password
              </Text>
              <View className="relative">
                <TextInput
                  placeholder="Min 8 characters"
                  placeholderTextColor="rgba(255,255,255,0.25)"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPass}
                  className="w-full bg-white/5 border border-white/12 rounded-2xl px-4 py-3.5 pr-12 text-white text-base"
                />
                <Pressable
                  onPress={() => setShowPass(!showPass)}
                  className="absolute right-4 top-3.5"
                >
                  <Text className="text-white/35 text-base">
                    {showPass ? "🙈" : "👁"}
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Terms */}
            <Text className="text-white/30 text-xs leading-relaxed mt-1">
              By signing up you agree to our{" "}
              <Text className="text-white/60">Terms of Service</Text> and{" "}
              <Text className="text-white/60">Privacy Policy</Text>.
            </Text>

            {/* Submit */}
            <Pressable className="w-full bg-white rounded-2xl py-4 items-center mt-3 active:opacity-80">
              <Text className="text-black text-base font-bold">
                Create account
              </Text>
            </Pressable>

            {/* Divider */}
            <View className="flex-row items-center gap-x-3 my-1">
              <View className="flex-1 h-px bg-white/10" />
              <Text className="text-white/25 text-xs">or</Text>
              <View className="flex-1 h-px bg-white/10" />
            </View>

            {/* Google */}
            <Pressable className="w-full bg-white/4 border border-white/10 rounded-2xl py-4 flex-row items-center justify-center gap-x-2.5 active:opacity-70">
              <Text className="text-white text-base font-medium">
                G  Continue with Google
              </Text>
            </Pressable>

            <Text className="text-center text-white/30 text-sm mt-2 mb-4">
              Already have an account?{" "}
              <Text onPress={onBack} className="text-white/70 font-medium">
                Sign in
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("landing");

  return page === "landing" ? (
    <LandingPage onStart={() => setPage("signup")} />
  ) : (
    <SignUpPage onBack={() => setPage("landing")} />
  );
}