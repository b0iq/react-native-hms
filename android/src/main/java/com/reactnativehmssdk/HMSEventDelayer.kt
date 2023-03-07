package com.reactnativehmssdk

import android.os.Handler
import android.os.Looper
import com.facebook.react.bridge.WritableMap
import kotlinx.coroutines.Runnable

interface HMSEventDelayerSetup {
  val onEventEmit: (event: String, data: WritableMap) -> Unit
  val totalEventsLimit: Int
  val coolDownMillis: Long
  val eventsIntervalMillis: Long
}

object HMSEventDelayer {
  private val coolDownHandler = Handler(Looper.getMainLooper())
  private var lastEventEmittedAt: Long = System.currentTimeMillis()
  private var dataQueue = mutableListOf<Pair<String, WritableMap>>()

  private var totalEventsLimit = 50 // total number of events emittable before cool-down is needed
  private var remainingEvents = totalEventsLimit // remaining number of events emittable before cool-down is needed

  private var eventsIntervalMillis: Long = 15 // duration between events emitted in milliseconds
  private var coolDownMillis: Long = 100 // cool down duration in milliseconds
  private var coolDownPeriodStarted = false
  private val coolDownCompleteRunnable = object: Runnable {
    override fun run() {
      if (coolDownPeriodStarted) {
        // restore limit
        remainingEvents = totalEventsLimit

        coolDownPeriodStarted = false
      }

      if (remainingEvents > 0) {
        // pop item from queue
      val eventData = dequeue()

        // if item is not valid
        if (eventData === null) {
          // we can emit events as they come
//          coolDownPeriodStarted = false
      }
        // if item is valid
        else {
          // emit event
          emit(eventData.first, eventData.second)

          // if remaining limit is still more than zero
          if (remainingEvents > 0) {
            // if data queue is empty, we don't have data to emit events
            if (dataQueue.isEmpty()) {
              // emit events as they come
//              coolDownPeriodStarted = false
    }
            // if data queue is not empty, emit next event after x-ms
            else {
              // Step A
              coolDownHandler.postDelayed(this, eventsIntervalMillis)
  }
          }
          // remaining limit is now exhausted
          // we have to wait minimum 100ms before emitting next set of events
          else {
            // if data queue is empty, we don't have to set timer right now
            if (dataQueue.isEmpty()) {
              // wait for event to come and take step based on when it comes
//              coolDownPeriodStarted = false
            }
            // if data queue is not empty, we have to set timer right now
            else {
              // We have pending events in queue, set 100ms timer to emit next set of events
              coolDownPeriodStarted = true
              coolDownHandler.postDelayed(this, coolDownMillis)
            }
          }
        }
      }
      // remaining limit is now exhausted
      // we have to wait minimum 100ms before emitting next set of events
      else {

        // if data queue is empty, we don't have to set timer right now
        if (dataQueue.isEmpty()) {
          // wait for event to come and take step based on when it comes
//          coolDownPeriodStarted = false
        }
        // if data queue is not empty, we have to set timer right now
        else {
          // We have pending events in queue, set 100ms timer to emit next set of events
          coolDownPeriodStarted = true
          coolDownHandler.postDelayed(this, coolDownMillis)
        }
      }
    }
  }

  private lateinit var emitterFunction: (event:String, data: WritableMap) -> Unit

  private fun dequeue(): Pair<String, WritableMap>? {
    if (dataQueue.size <= 0) {
      return null
    }
    return dataQueue.removeFirst()
  }

  private fun enqueue(data: Pair<String, WritableMap>): Boolean {
    return dataQueue.add(data)
  }

  // TODO: `cleanup` function can be used to when user leaves room or removed from room
  private fun cleanup() {
    coolDownHandler.removeCallbacks(coolDownCompleteRunnable)
  }

  private fun emit(event: String, data: WritableMap) {
    emitterFunction(event, data)
    remainingEvents -= 1
    lastEventEmittedAt = System.currentTimeMillis()
  }

  private fun getDelaySinceLastEmittedEvent(): Long {
    return System.currentTimeMillis() - lastEventEmittedAt
  }

  fun emitWithDelay(event: String, data: WritableMap) {
    // If queue is not empty
    if (dataQueue.isNotEmpty()) {
      // Add event to queue
      enqueue(Pair(event, data))
      return
    }

    val delaySinceLastEmittedEvent = getDelaySinceLastEmittedEvent()

    // Limit is not full
    // we can dispatch events
    if (remainingEvents > 0) {

      // event comes after 100ms is over
      if (delaySinceLastEmittedEvent >= coolDownMillis) {
        // restore limit
        remainingEvents = totalEventsLimit
    }

      // normal dispatch
      emit(event, data)
    }
    // Limit is full
    // wait 100ms before dispatching next batch of events
    else {
      // event comes after 100ms
      if (delaySinceLastEmittedEvent >= coolDownMillis) {
        // restore limit
        remainingEvents = totalEventsLimit
        // normal dispatch
        emit(event, data)
      }
      // event comes before 100ms is over
      else {
        // add to queue
        enqueue(Pair(event, data))

        // set timer of remaining time
        val remainingTime = maxOf(0, coolDownMillis - (System.currentTimeMillis() - lastEventEmittedAt))
        // set timer state to `true`
        coolDownPeriodStarted = true
        coolDownHandler.postDelayed(coolDownCompleteRunnable, remainingTime)
      }
    }
  }

  fun setEmitterFunction(setupData: HMSEventDelayerSetup) {
    coolDownMillis = setupData.coolDownMillis
    eventsIntervalMillis = setupData.eventsIntervalMillis
    totalEventsLimit = setupData.totalEventsLimit
    emitterFunction = setupData.onEventEmit
  }
}
